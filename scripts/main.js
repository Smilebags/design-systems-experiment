class ThemePicker extends HTMLElement {
    connectedCallback() {
        let shadow = this.attachShadow({mode: 'open'});
        var darkWrapper = document.createElement('div');
        var lightWrapper = document.createElement('div');
        darkWrapper.classList.add('dark-wrapper');
        lightWrapper.classList.add('light-wrapper');
        
        var darkCheckbox = document.createElement('span');
        var lightCheckbox = document.createElement('span');
        darkCheckbox.classList.add('checkbox');
        lightCheckbox.classList.add('checkbox');
        lightCheckbox.classList.add('active');
        document.documentElement.classList.add("theme-light");
        
        var darkText = document.createElement('span');
        var lightText = document.createElement('span');
        darkText.classList.add('label');
        lightText.classList.add('label');
        darkText.textContent = "Dark";
        lightText.textContent = "Light";


        var style = document.createElement('style');
        style.textContent = `
            .checkbox {
                display: inline-block;
                width: 1em;
                height: 1em;
                border: 1px solid rgba(127,127,127, 0.4);
                background-color: transparent;
                transition: background-color 0.1s;
                margin-right: var(--s3);
            }
            .dark-wrapper, .light-wrapper {
                margin-bottom: var(--s2);
            }
            .checkbox.active {
                background-color: var(--primary-color);
            }
            .label {
                position: relative;
                top: -2px;
            }
        `;

        darkWrapper.appendChild(darkCheckbox);
        darkWrapper.appendChild(darkText);
        lightWrapper.appendChild(lightCheckbox);
        lightWrapper.appendChild(lightText);
        shadow.appendChild(darkWrapper);
        shadow.appendChild(lightWrapper);
        shadow.appendChild(style);

        let settingsBar = document.querySelector(".settings-bar");
        darkCheckbox.addEventListener("click", () => {
            lightCheckbox.classList.remove("active");
            darkCheckbox.classList.add("active");
            document.documentElement.classList.add("theme-dark");
            document.documentElement.classList.remove("theme-light");
            settingsBar.classList.add("changed");
        });
        lightCheckbox.addEventListener("click", () => {
            darkCheckbox.classList.remove("active");
            lightCheckbox.classList.add("active");
            document.documentElement.classList.add("theme-light");
            document.documentElement.classList.remove("theme-dark");
            settingsBar.classList.add("changed");
        });
        
    }
  }

customElements.define('theme-picker', ThemePicker);


document.addEventListener("DOMContentLoaded",(e) => {
    let settingsSave =  document.querySelector(".settings-bar .save");
    settingsSave.addEventListener("click",(e) => {
        let settingsBar = document.querySelector(".settings-bar");
        settingsBar.classList.remove("changed");
        settingsBar.classList.add("close");
        setTimeout(() => {
            settingsBar.classList.remove("close");
        }, 500);
    });
});