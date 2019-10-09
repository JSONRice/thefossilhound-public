let breadcrumbServiceInstance = null;

// Purposely not using redux for simplicity.
class BreadcrumbService {
  constructor() {
    if (!breadcrumbServiceInstance) {
      breadcrumbServiceInstance = this;
    }

    return breadcrumbServiceInstance;
  }

  _breadcrumbItems = [];

  push(title, url) {
    // Had to put this code in because server side it was mounting the component twice
    if (this._isDuplicate(url)) {
      return;
    }

    this._breadcrumbItems.push({ title, url });
  }

  pop() {
    this._breadcrumbItems.pop();
  }

  getItems() {
    return this._breadcrumbItems;
  }

  debug() {
    this._breadcrumbItems.forEach(item =>
      console.log(`title: ${item.title} url: ${item.url}`)
    );
  }

  _isDuplicate(url) {
    if (this._breadcrumbItems.length > 0) {
      if (this._breadcrumbItems[this._breadcrumbItems.length - 1].url === url) {
        return true;
      }
    }
    return false;
  }
}

export default BreadcrumbService;
