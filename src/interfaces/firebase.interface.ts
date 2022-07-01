
export interface ProactiveRefresh {
    user: any[];
    isRunning: boolean;
    timerId?: any;
    errorBackoff: number;
}
export interface ReloadUserInfo {
    localId: string;
    email: string;
    passwordHash: string;
    emailVerified: boolean;
    passwordUpdatedAt: number;
    providerUserInfo: any[];
    validSince: string;
    lastLoginAt: string;
    createdAt: string;
    lastRefreshAt: Date;
}
export interface Auth {
    app: any[];
    heartbeatServiceProvider: any[];
    config: any[];
    currentUser: any[];
    emulatorConfig?: any;
    operations: any[];
    authStateSubscription: any[];
    idTokenSubscription: any[];
    beforeStateQueue: any[];
    redirectUser?: any;
    isProactiveRefreshEnabled: boolean;
    _canInitEmulator: boolean;
    _isInitialized: boolean;
    _deleted: boolean;
    _initializationPromise: any[];
    _popupRedirectResolver?: any;
    _errorFactory: any[];
    lastNotifiedUid: string;
    languageCode?: any;
    tenantId?: any;
    settings: any[];
    frameworks: any[];
    name: string;
    clientVersion: string;
    persistenceManager: any[];
}
export interface StsTokenManager {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
}
export interface Metadata {
    createdAt: string;
    lastLoginAt: string;
    lastSignInTime: string;
    creationTime: string;
}
export interface Firebase {
    providerId: string;
    proactiveRefresh: ProactiveRefresh;
    reloadUserInfo: ReloadUserInfo;
    reloadListener?: any;
    uid: string;
    auth: Auth;
    stsTokenManager: StsTokenManager;
    accessToken: string;
    displayName?: any;
    email: string;
    emailVerified: boolean;
    phoneNumber?: any;
    photoURL?: any;
    isAnonymous: boolean;
    tenantId?: any;
    providerData: any[];
    metadata: Metadata;
}


