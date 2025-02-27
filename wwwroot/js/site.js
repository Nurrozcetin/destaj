window.setCookie = (name, value, expires) => {
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

window.getCookie = (name) => {
    let match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
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