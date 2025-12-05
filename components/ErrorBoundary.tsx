import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white p-4 text-center">
          <div className="bg-red-900/20 border border-red-800 rounded-xl p-8 max-w-lg w-full">
            <div className="mb-4 text-red-500">
               <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <h1 className="text-2xl font-bold text-red-500 mb-2">Terjadi Kesalahan</h1>
            <p className="text-gray-400 mb-6 text-sm">
              Aplikasi mengalami masalah teknis. Silakan coba muat ulang.
            </p>
            
            {this.state.error && (
              <div className="mb-6 text-left">
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Error Details:</p>
                <pre className="bg-black/50 border border-gray-800 p-3 rounded-lg text-xs text-red-300 overflow-auto max-h-32 custom-scrollbar font-mono">
                  {this.state.error.toString()}
                </pre>
              </div>
            )}

            <button
              onClick={() => window.location.reload()}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-bold transition-colors shadow-lg shadow-indigo-900/20 w-full"
            >
              Muat Ulang Aplikasi
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}