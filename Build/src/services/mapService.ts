// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const getRedirectPath1 = (currentPath: string): string => {
    switch (currentPath) {
        case '/':
            return '/login';
        case '/login':
            return '/transaction';
        case '/transaction':
            return '/withdraw';
        case '/deposit':
            return '/transaction';
        case '/withdraw':
            return '/transaction';
        case '/transfer':
            return '/transaction';
        case '/balance':
            return '/transaction';
    }
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const getRedirectPath2 = (currentPath: string): string => {
    switch (currentPath) {
        case '/login':
            return '/';
        case '/transaction':
            return '/';
        case '/withdraw':
            return '/transaction';
        case '/deposit':
            return '/transaction';
        case '/balance':
            return '/transaction';
        case '/transfer':
            return '/transaction'
    }
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const getRedirectPath3 = (currentPath: string): string => {
    switch (currentPath) {
        case '/transaction':
            return '/deposit';
        case '/withdraw':
            return '/transaction';
    }
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const getRedirectPath4 = (currentPath: string): string => {
    switch (currentPath) {
        case '/transaction':
            return '/balance';
        case '/withdraw':
            return '/transaction';
    }
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const getRedirectPath5 = (currentPath: string): string => {
    switch (currentPath) {
        case '/transaction':
            return '/transfer';
        case '/withdraw':
            return '/transaction';
    }
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const getRedirectPath6 = (currentPath: string): string => {
    switch (currentPath) {
        case '/withdraw':
            return '/transaction';
    }
};

