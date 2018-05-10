export default {
  host: 'http://localhost',
  port: '3000',
  get url() {
    return `${this.host}:${this.port}`;
  }
};