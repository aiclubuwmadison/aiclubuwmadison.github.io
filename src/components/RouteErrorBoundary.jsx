import { Component } from "react";
import "./RouteErrorBoundary.css";

// Final safety net for lazy route rendering. lazyWithRetry() already retries
// and reloads once for chunk failures; if a route still throws (a persistent
// chunk error after that reload, or a genuine render error) this boundary
// catches it and offers an explicit reload instead of a blank screen.
//
// A plain state reset can't recover a failed React.lazy import (its rejected
// promise is cached on the component), so the primary recovery action is a
// hard reload, which re-fetches the current chunk manifest.
class RouteErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.handleReload = this.handleReload.bind(this);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleReload() {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="route-error" role="alert">
          <div className="route-error-inner">
            <p className="route-error-eyebrow">Something went wrong</p>
            <h1 className="route-error-title">We couldn’t load this page</h1>
            <p className="route-error-lede">
              This is usually a temporary network hiccup or an outdated tab after
              a site update. Reloading should fix it.
            </p>
            <button
              type="button"
              className="atmos-btn-primary route-error-btn"
              onClick={this.handleReload}
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default RouteErrorBoundary;
