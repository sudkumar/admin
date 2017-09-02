const axios = require('axios');


axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"
axios.defaults.withCredentials = true
axios.defaults.xsrfCookieName = undefined

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

const requestSuccessInterceptor = (config) => {
    const authTokens = getSavedAuthTokens()
    switch (config.method) {
    case "get":
        return {
            ...config,
            params: {
                ...config.params
            }
            // headers: {
            //     ...authTokens
            // }
        }
    case "post":
    case "patch":
    case "put":
    case "delete":
        return {
            ...config,
            data: {
                ...config.data,
                ...authTokens
            }
            // headers: {
            //     ...authTokens
            // }
        }
    default:
        console.log("Unhandled interceptor for method of type: ", config.method)
        return config
    }
}

const responseSuccessInterceptor = (response) => {
    // extract the auth tokens from the request if they are present
    if (response.data && Types.isObject(response.data)) {
        const accessToken = response.data.access_token
        const csrfToken = response.data.csrf_token
        if (accessToken && csrfToken) {
            // save the tokens
            updateAuthTokens(accessToken, csrfToken)
        }
    }
    // return the promise for chaining
    return Promise.resolve(response)
}

const resposeFailedInterceptor = (error, routing = {}) => {
    const { response = {} } = error
    const { data = {} } = response
    const respError = data.error
    if (error && error.name === "Error") {
        error.message = "Network error. Please try again."
    }
    // customize the error messages for the errors
    switch (response.status) {
    case 401:
        const { locationBeforeTransitions } = routing
        const authRegex = new RegExp(`^/auth`)
        if (locationBeforeTransitions && !authRegex.test(locationBeforeTransitions.pathname)) {
            // swal({
            //     title: "Session Expired",
            //     text: "Your session expired. Please login again.",
            //     type: "info",
            //     showCancelButton: false,
            //     confirmButtonColor: "orangered",
            //     confirmButtonText: "Login",
            //     closeOnConfirm: true
            // }, () => {
            //     window.location = window.location
            // })
        }
        error.message = "Your session expired. Please login again."
        break
    case 500:
        error.message = "Can't process request now. Please try after some time."
        break
    case 422:
        error.message = "Invalid input data. Please correct before submitting."
        if (respError) {
            respError.message = "Please enter valid data."
        }
        break
    default:
        break
    }
    // return the promise for further chaining
    return Promise.reject(respError || error)
}

const createAPI = (config, routing = {}) => {
    // create an instance as we would with normal axios
    // extract some custom options
    const { noInterceptor, noRequestInterceptor, noResponseInterceptor, ...otherConfig } = config
    const instance = axios.create(otherConfig)
    if (noInterceptor) {
        return instance
    }

    if (!noRequestInterceptor) {
        // intercept the request by adding auth tokens
        instance.interceptors.request.use(
            (request) => requestSuccessInterceptor(request, routing),
            (error) => Promise.reject(error)
        )
    }

    if (!noResponseInterceptor) {
        // intercept the response
        instance.interceptors.response.use(
            (response) => responseSuccessInterceptor(response, routing),
            (error) => resposeFailedInterceptor(error, routing)
        )
    }
    // return the created axios instance
    return instance
}


export const ajax = (state = {}) => {
    const { user = {}, routing } = state
    const { data = {} } = user
    const userId = data.id
    const communityId = data.communityId
    const baseURL = axios.defaults.baseURL
    axios.withCreate = true
    return {
        userId,
        communityId,
        baseURL,
        createAPI: (config) => createAPI(config, routing)
    }
}

export default ajax
