'use client';

import { useState } from 'react';
import { Star, MapPin, TrendingUp, TrendingDown, Minus, Search, Filter, Bell, Settings } from 'lucide-react';

interface Review {
  id: string;
  platform: 'google' | 'makemytrip' | 'booking' | 'tripadvisor';
  guestName: string;
  rating: number;
  snippet: string;
  fullText: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  date: string;
  location?: string;
  aiAnalysis: {
    overallSentiment: string;
    keyTopics: string[];
    urgency: 'high' | 'medium' | 'low';
    suggestedResponse?: string;
  };
}

const mockReviews: Review[] = [
  {
    id: '1',
    platform: 'google',
    guestName: 'Priya S.',
    rating: 4,
    snippet: 'Excellent location and wonderful staff! The room was clean and comfortable...',
    fullText: 'Excellent location and wonderful staff! The room was clean and comfortable. The breakfast spread was amazing with lots of Indian and continental options. Only minor issue was the WiFi speed could be better. Overall, a great stay and would definitely recommend to others visiting Mumbai.',
    sentiment: 'positive',
    date: '2 hours ago',
    location: 'Mumbai, Maharashtra',
    aiAnalysis: {
      overallSentiment: 'Positive with minor concern',
      keyTopics: ['Staff Service', 'Cleanliness', 'Location', 'WiFi Issue'],
      urgency: 'low',
      suggestedResponse: 'Thank them for the positive feedback, acknowledge the WiFi concern, and mention recent upgrades.'
    }
  },
  {
    id: '2',
    platform: 'makemytrip',
    guestName: 'Rajesh Kumar',
    rating: 2,
    snippet: 'Very disappointed with the service. Had to wait 30 minutes at check-in...',
    fullText: 'Very disappointed with the service. Had to wait 30 minutes at check-in despite having a confirmed booking. The AC in our room was not working properly and it took them 2 hours to send someone to fix it. This is not acceptable for the price we paid. The only good thing was the food quality.',
    sentiment: 'negative',
    date: '5 hours ago',
    location: 'Delhi',
    aiAnalysis: {
      overallSentiment: 'Highly Negative - Service Issues',
      keyTopics: ['Check-in Delay', 'AC Malfunction', 'Slow Response', 'Food Quality'],
      urgency: 'high',
      suggestedResponse: 'Apologize sincerely, explain process improvements, offer compensation or discount for future stay.'
    }
  },
  {
    id: '3',
    platform: 'booking',
    guestName: 'Anjali Mehta',
    rating: 5,
    snippet: 'Perfect stay! Everything exceeded our expectations. The hospitality was top-notch...',
    fullText: 'Perfect stay! Everything exceeded our expectations. The hospitality was top-notch and the staff went out of their way to make our anniversary special. They arranged a surprise cake and room decoration. The rooftop restaurant has an amazing view. Highly recommended for couples!',
    sentiment: 'positive',
    date: '1 day ago',
    location: 'Jaipur, Rajasthan',
    aiAnalysis: {
      overallSentiment: 'Extremely Positive',
      keyTopics: ['Excellent Service', 'Anniversary Celebration', 'Rooftop Restaurant', 'Romantic'],
      urgency: 'low',
      suggestedResponse: 'Express gratitude, congratulate on anniversary, invite them back for future occasions.'
    }
  },
  {
    id: '4',
    platform: 'tripadvisor',
    guestName: 'Vikram Desai',
    rating: 3,
    snippet: 'Average experience. The hotel is decent but nothing extraordinary...',
    fullText: 'Average experience. The hotel is decent but nothing extraordinary. Good location near the railway station. Rooms are clean but slightly outdated. Staff is polite. Breakfast could have more variety. It serves the purpose if you are just looking for a place to stay.',
    sentiment: 'neutral',
    date: '2 days ago',
    location: 'Pune, Maharashtra',
    aiAnalysis: {
      overallSentiment: 'Neutral - Mixed Feedback',
      keyTopics: ['Location', 'Cleanliness', 'Outdated Rooms', 'Limited Breakfast'],
      urgency: 'medium',
      suggestedResponse: 'Thank for feedback, mention upcoming room renovations, share plans for enhanced breakfast menu.'
    }
  },
  {
    id: '5',
    platform: 'google',
    guestName: 'Neha Sharma',
    rating: 5,
    snippet: 'Amazing experience! The heritage property is beautifully maintained...',
    fullText: 'Amazing experience! The heritage property is beautifully maintained with traditional architecture. The courtyards and gardens are stunning. Staff knowledge about local attractions was very helpful. The in-house restaurant serves authentic Rajasthani cuisine. A must-visit!',
    sentiment: 'positive',
    date: '3 days ago',
    location: 'Udaipur, Rajasthan',
    aiAnalysis: {
      overallSentiment: 'Extremely Positive',
      keyTopics: ['Heritage Property', 'Architecture', 'Staff Knowledge', 'Local Cuisine'],
      urgency: 'low',
      suggestedResponse: 'Express appreciation, highlight heritage aspects, share information about cultural events.'
    }
  },
  {
    id: '6',
    platform: 'makemytrip',
    guestName: 'Suresh Patel',
    rating: 1,
    snippet: 'Terrible experience. The photos online are misleading. Room was dirty...',
    fullText: 'Terrible experience. The photos online are misleading. Room was dirty when we arrived and had a bad smell. Asked to change rooms but they said hotel was fully booked. Bathroom fittings were broken. Would not recommend this place to anyone. Complete waste of money.',
    sentiment: 'negative',
    date: '4 days ago',
    location: 'Bangalore, Karnataka',
    aiAnalysis: {
      overallSentiment: 'Highly Negative - Critical Issues',
      keyTopics: ['Cleanliness', 'Misleading Photos', 'Maintenance Issues', 'Poor Management'],
      urgency: 'high',
      suggestedResponse: 'Issue urgent apology, investigate incident, offer full refund, explain corrective measures taken.'
    }
  }
];

const platformLogos = {
  google: '🔍',
  makemytrip: '✈️',
  booking: '🏨',
  tripadvisor: '🦉'
};

const platformColors = {
  google: 'bg-blue-50 text-blue-600',
  makemytrip: 'bg-red-50 text-red-600',
  booking: 'bg-blue-50 text-blue-700',
  tripadvisor: 'bg-green-50 text-green-600'
};

export default function Dashboard() {
  const [selectedReview, setSelectedReview] = useState<Review>(mockReviews[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <div className="w-2 h-2 rounded-full bg-green-500" title="Positive" />;
      case 'negative':
        return <div className="w-2 h-2 rounded-full bg-red-500" title="Negative" />;
      default:
        return <div className="w-2 h-2 rounded-full bg-gray-400" title="Neutral" />;
    }
  };

  const getSentimentEmoji = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return '😊';
      case 'negative':
        return '😠';
      default:
        return '😐';
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    const styles = {
      high: 'bg-red-100 text-red-700 border-red-200',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      low: 'bg-green-100 text-green-700 border-green-200'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[urgency as keyof typeof styles]}`}>
        {urgency.toUpperCase()} PRIORITY
      </span>
    );
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const stats = {
    totalReviews: mockReviews.length,
    avgRating: (mockReviews.reduce((acc, r) => acc + r.rating, 0) / mockReviews.length).toFixed(1),
    positive: mockReviews.filter(r => r.sentiment === 'positive').length,
    negative: mockReviews.filter(r => r.sentiment === 'negative').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Ritam Reviews Dashboard</h1>
              <p className="text-sm text-slate-600 mt-0.5">Unified review management for your hotel</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-slate-600" />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-slate-600" />
              </button>
              <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
                <div className="text-right">
                  <div className="text-sm font-medium text-slate-900">Hotel Manager</div>
                  <div className="text-xs text-slate-500">Mumbai Property</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                  HM
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">Total Reviews</p>
                  <p className="text-3xl font-bold text-blue-900 mt-1">{stats.totalReviews}</p>
                </div>
                <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-blue-700" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-amber-600 uppercase tracking-wide">Avg Rating</p>
                  <p className="text-3xl font-bold text-amber-900 mt-1">{stats.avgRating}</p>
                </div>
                <div className="w-12 h-12 bg-amber-200 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-amber-700" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-green-600 uppercase tracking-wide">Positive</p>
                  <p className="text-3xl font-bold text-green-900 mt-1">{stats.positive}</p>
                </div>
                <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">😊</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-red-600 uppercase tracking-wide">Negative</p>
                  <p className="text-3xl font-bold text-red-900 mt-1">{stats.negative}</p>
                </div>
                <div className="w-12 h-12 bg-red-200 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">😠</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-12 gap-6 max-w-[1800px] mx-auto">
          {/* Left Column - Review Feed */}
          <div className="col-span-5 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900">Recent Reviews</h2>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-medium text-slate-700 transition-colors">
                  <Filter className="w-3.5 h-3.5" />
                  Filter
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="overflow-y-auto" style={{ height: 'calc(100vh - 380px)' }}>
              {mockReviews.map((review) => (
                <button
                  key={review.id}
                  onClick={() => setSelectedReview(review)}
                  className={`w-full p-5 border-b border-slate-200 hover:bg-slate-50 transition-all text-left ${
                    selectedReview.id === review.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-lg text-base ${platformColors[review.platform]}`}>
                        {platformLogos[review.platform]}
                      </span>
                      <div>
                        <div className="font-semibold text-slate-900 text-sm">{review.guestName}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{review.date}</div>
                      </div>
                    </div>
                    {getSentimentIcon(review.sentiment)}
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    {renderStars(review.rating)}
                    <span className="text-xs font-medium text-slate-600">({review.rating}/5)</span>
                  </div>

                  {review.location && (
                    <div className="flex items-center gap-1 mb-2">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-500">{review.location}</span>
                    </div>
                  )}

                  <p className="text-sm text-slate-700 line-clamp-2 leading-relaxed">
                    {review.snippet}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Details & Actions */}
          <div className="col-span-7 space-y-6">
            {/* Full Review Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <span className={`px-3 py-2 rounded-xl text-2xl ${platformColors[selectedReview.platform]}`}>
                      {platformLogos[selectedReview.platform]}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{selectedReview.guestName}</h3>
                      <div className="flex items-center gap-3 mt-2">
                        {renderStars(selectedReview.rating)}
                        <span className="text-sm font-semibold text-slate-700">
                          {selectedReview.rating}.0 out of 5
                        </span>
                      </div>
                      {selectedReview.location && (
                        <div className="flex items-center gap-1.5 mt-2">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-600">{selectedReview.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-slate-500">{selectedReview.date}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
                  Full Review
                </h4>
                <p className="text-slate-800 leading-relaxed text-base">
                  {selectedReview.fullText}
                </p>
              </div>
            </div>

            {/* AI Sentiment Analysis Card */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-lg border border-purple-200 overflow-hidden">
              <div className="p-6 border-b border-purple-200 bg-white/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <span className="text-xl">🤖</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">AI Sentiment Analysis</h3>
                      <p className="text-xs text-slate-600">Powered by advanced NLP</p>
                    </div>
                  </div>
                  {getUrgencyBadge(selectedReview.aiAnalysis.urgency)}
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{getSentimentEmoji(selectedReview.sentiment)}</span>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                        Overall Sentiment
                      </h4>
                      <p className="text-lg font-bold text-slate-900 mt-1">
                        {selectedReview.aiAnalysis.overallSentiment}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
                    Key Topics Detected
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedReview.aiAnalysis.keyTopics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-slate-700 border border-purple-200 shadow-sm"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedReview.aiAnalysis.suggestedResponse && (
                  <div className="bg-white/70 rounded-xl p-4 border border-purple-200">
                    <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-2 flex items-center gap-2">
                      <span>💡</span>
                      Suggested Response Strategy
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {selectedReview.aiAnalysis.suggestedResponse}
                    </p>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg">
                    Generate AI Response
                  </button>
                  <button className="px-6 py-3 bg-white border border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                    Mark as Resolved
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
