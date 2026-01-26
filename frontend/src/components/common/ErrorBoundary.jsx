import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-10 w-10 text-red-600" />
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
              Oops! Something went wrong
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-center mb-8">
              We're sorry for the inconvenience. An unexpected error occurred while loading this page.
            </p>

            {/* Error Details (in development only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-8 p-4 bg-gray-100 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-2">Error Details:</p>
                <pre className="text-xs text-red-600 overflow-auto max-h-40">
                  {this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleReload}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl"
              >
                <RefreshCw className="h-5 w-5" />
                Reload Page
              </button>
              <button
                onClick={this.handleReset}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
              >
                <Home className="h-5 w-5" />
                Go to Homepage
              </button>
            </div>

            {/* Help Text */}
            <p className="text-sm text-gray-500 text-center mt-8">
              If the problem persists, please contact our support team at{' '}
              <a href="mailto:support@riointernational.com" className="text-primary-600 hover:underline">
                support@riointernational.com
              </a>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Page-level error fallback component (for React Query errors)
export const QueryErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
          <AlertTriangle className="h-8 w-8 text-orange-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Failed to Load Data
        </h2>
        
        <p className="text-gray-600 mb-6">
          We couldn't load the requested data. This might be due to a network issue or server problem.
        </p>

        {process.env.NODE_ENV === 'development' && error && (
          <div className="mb-6 p-3 bg-red-50 rounded-lg text-left">
            <p className="text-xs text-red-600 font-mono break-all">
              {error.message}
            </p>
          </div>
        )}

        <button
          onClick={resetErrorBoundary}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all"
        >
          <RefreshCw className="h-5 w-5" />
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorBoundary;
