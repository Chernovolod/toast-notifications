var components = function () {
    var Popup = function () {
        this.parentNode = document.body;
    };

    Popup.prototype.show = function () {
        this.parentNode.appendChild(this.DOMnode);
        var toastsParent = document.querySelector('.toast-notification');
        setTimeout((function () {
            if (this.parentNode.contains(this.DOMnode) && this.parentNode === toastsParent) {
                this.parentNode.removeChild(this.DOMnode);
            }
        }).bind(this), this.timeOut || 5000)
    };

    Popup.prototype.hide = function () {
        this.parentNode.removeChild(this.DOMnode);
    };

    var Toast = function (type, text, timeOut) {
        this.type = type;
        this.text = text;
        this.timeOut = timeOut;

        var toastTypes = {
            warning: 'toast-notification__warning',
            success: 'toast-notification__success',
            info: 'toast-notification__info',
            error: 'toast-notification__error'
        };
        var iconSources = {
            warning: './images/icons/warning.svg',
            success: './images/icons/success.svg',
            info: './info.svg',
            error: './images/icons/error.svg'
        }
        var singleToast = document.createElement('div');
        var toastContainer = document.querySelector('.toast-notification');
        var toastTitle = document.createElement('div');
        var toastMessage = document.createElement('div');
        var closeButton = document.createElement('button');
        var icon = document.createElement('img');
        var hideHandler = function () {
            this.hide()
        };

        closeButton.classList.add('toast-notification__close');
        closeButton.addEventListener('click', hideHandler.bind(this));

        toastMessage.innerText = this.text;

        toastTitle.innerText = this.type;

        icon.classList.add('toast-notification__icon');
        icon.src = iconSources[type];

        singleToast.classList.add(toastTypes[type]);
        singleToast.appendChild(icon);
        singleToast.appendChild(toastTitle);
        singleToast.appendChild(toastMessage);
        singleToast.appendChild(closeButton);

        this.DOMnode = singleToast;
        this.parentNode = toastContainer;
    };

    Toast.prototype = Object.create(Popup.prototype);

    return {
        Toast: Toast
    }
}();

module.exports = components;
