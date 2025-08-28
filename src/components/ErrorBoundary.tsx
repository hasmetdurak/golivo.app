import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    console.error('🚨 Error caught by ErrorBoundary:', error);
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('🚨 Error details:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div 
          style={{ 
            padding: '40px 20px', 
            fontFamily: 'Arial, sans-serif',
            textAlign: 'center',
            backgroundColor: '#f8f9fa',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <h1 style={{ color: '#dc3545', marginBottom: '20px' }}>⚽ GoLivo - Live Football Scores</h1>
          <h2 style={{ color: '#6c757d', marginBottom: '20px', fontWeight: 'normal' }}>
            We're experiencing technical difficulties
          </h2>
          <p style={{ color: '#6c757d', marginBottom: '30px', maxWidth: '500px' }}>
            Our team is working to fix this issue. Please try refreshing the page or come back in a few minutes.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            🔄 Refresh Page
          </button>
          {import.meta.env.DEV && this.state.error && (
            <details style={{ marginTop: '30px', textAlign: 'left', maxWidth: '600px' }}>
              <summary style={{ cursor: 'pointer', color: '#dc3545' }}>
                Error Details (Development)
              </summary>
              <pre style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '15px', 
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '12px',
                color: '#495057',
                marginTop: '10px'
              }}>
                {this.state.error.message}
                {'\n\n'}
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;