export class AppConfiguration {
  isProduction: boolean = false;
  apiBaseUrl: ApiBaseUrl = new ApiBaseUrl();
}

export class ApiBaseUrl {
  falcon: string = '';
}
