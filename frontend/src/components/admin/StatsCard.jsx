import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';
import Card from '../common/Card';

const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendValue, 
  color = 'blue',
  loading = false 
}) => {
  const colorClasses = {
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-emerald-500 to-teal-500',
    orange: 'from-orange-500 to-amber-500',
    purple: 'from-violet-500 to-purple-500',
    rose: 'from-rose-500 to-pink-500',
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-32 mb-3"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
      </Card>
    );
  }

  const isPositive = trend === 'up';

  return (
    <Card hover className="p-6 group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
            {value}
          </h3>
          
          {trendValue && (
            <div className="flex items-center gap-1">
              {isPositive ? (
                <ArrowUp className="w-4 h-4 text-emerald-500" />
              ) : (
                <ArrowDown className="w-4 h-4 text-rose-500" />
              )}
              <span className={`text-sm font-semibold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                {trendValue}
              </span>
              <span className="text-sm text-gray-500">vs last month</span>
            </div>
          )}
        </div>

        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
