import { SoSimpleRef } from './ref';
import { SiteStatic } from './site-static';

export class SoSimpleDynamicResource<T> {
  private loaded = new SoSimpleRef(false);
  private __data: T | null = null;
  constructor(src: Promise<T> | string, transform = (x: unknown): T => x as never) {
    const promise = typeof src === 'string' ? fetch(SiteStatic.url_for(src)).then((body) => body.json()) : src;

    promise.then((res) => {
      this.loaded.value = true;
      this.__data = transform(res);
    });
  }
  async data() {
    await this.loaded.unitl(true);
    return this.__data as T;
  }
}
