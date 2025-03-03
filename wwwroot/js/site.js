window.setCookie = (name, value, expires) => {
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

window.getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        let [cookieName, cookieValue] = cookie.split('=');
        cookieName = cookieName.trim();
        if (cookieName === name) {
            try {
                if (cookieValue.startsWith("{") && cookieValue.endsWith("}")) {
                    const cookieData = JSON.parse(decodeURIComponent(cookieValue));
                    if (new Date(cookieData.expiration) < new Date()) {
                        window.deleteCookie(name);
                        return null;
                    }
                    return cookieData.value;
                }
                return decodeURIComponent(cookieValue);
            } catch (e) {
                return null;
            }
        }
    }
    return null;
};

window.getLastCookie = () => {
    let cookies = document.cookie.split("; ");
    if (cookies.length === 0 || document.cookie === "") return "";

    let lastCookie = cookies[cookies.length - 1];
    let [key, value] = lastCookie.split("=");

    return value ? decodeURIComponent(value) : "";
};

window.deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    return true;
}

window.showSuccessPopup = (message) => {
    Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: message,
        showConfirmButton: false,
        timer: 2000
    });
};

window.showErrorPopup = (message) => {
    Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: message,
        showConfirmButton: false,
        timer: 2000
    });
};
function getAllCookies() {
    return document.cookie;
}

window.registerActivityListeners = (dotNetHelper) => {
    let activityTimeout;

    function resetTimer() {
        clearTimeout(activityTimeout);
        activityTimeout = setTimeout(() => {
            dotNetHelper.invokeMethodAsync('UpdateActivity');
        }, 5000); 
    }

    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('keydown', resetTimer);
    document.addEventListener('click', resetTimer);
    document.addEventListener('scroll', resetTimer);

    resetTimer();
};

window.isCookieValid = (name) => {
    const cookieValue = window.getCookie(name);
    return cookieValue !== null && cookieValue !== undefined && cookieValue !== "";
};
