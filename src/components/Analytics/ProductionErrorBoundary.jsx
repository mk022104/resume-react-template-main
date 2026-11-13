import React from 'react';
import { reportProductionError } from './productionErrorTracking';

export default class ProductionErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    reportProductionError(error, {
      source: 'react_error_boundary',
      component_stack: errorInfo.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center p-6 text-center">
          <div className="max-w-md rounded-md bg-white p-8 shadow-md">
            <h1 className="mb-3 text-2xl font-bold text-gray-900">
              Something went wrong
            </h1>
            <p className="mb-5 text-gray-600">
              The page encountered an unexpected error. Refresh the page and try
              again.
            </p>
            <button
              type="button"
              className="rounded bg-purple-700 px-5 py-2 text-white"
              onClick={() => window.location.reload()}
            >
              Refresh page
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
