declare module "govuk-frontend" {
  export interface InitAllOptions {
    scope?: HTMLElement;
  }

  export function initAll(options?: InitAllOptions): void;
}
