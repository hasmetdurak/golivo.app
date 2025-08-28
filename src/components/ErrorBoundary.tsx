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
    console.error('🚨 Error stack:', error.stack);
    console.error('🚨 Error message:', error.message);
    // Only catch actual React errors, not network/API errors
    if (error.name === 'ChunkLoadError' || error.message.includes('Loading chunk')) {
      // This is likely a build/deployment issue, reload page
      window.location.reload();
      return { hasError: false };
    }
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
            Teknik sorun tespit edildi - Technical issue detected
          </h2>
          <p style={{ color: '#6c757d', marginBottom: '30px', maxWidth: '500px' }}>
            Patron, lütfen sayfayı yenileyin veya F12'ye basıp Console'da hatayı kontrol edin.
            <br/>Please refresh the page or check browser console (F12) for error details.
          </p>
          {this.state.error && (
            <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '6px', maxWidth: '600px' }}>
              <strong>Hata: {this.state.error.message}</strong>
            </div>
          )}
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
            🔄 Sayfayı Yenile / Refresh Page
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