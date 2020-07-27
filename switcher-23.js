function draw_switcher23(name, value, post_id, event) {
            let id = this.create_id('sw');
            let container = document.createElement('div');
            container.classList.add('switcher23-container');

            let hidden = document.createElement('input');
            hidden.setAttribute('type', 'hidden');
            hidden.setAttribute('name', name);
            hidden.setAttribute('value', value);

            let checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('id', id);
            checkbox.setAttribute('class', 'switcher23');
            checkbox.setAttribute('value', value);

            if (value) {
                checkbox.setAttribute('checked', true);
            }

            checkbox.setAttribute('data-post-id', post_id);
            checkbox.setAttribute('data-event', event);

            let label = document.createElement('label');
            label.setAttribute('for', id);
            label.setAttribute('class', 'switcher23-toggle');
            label.innerHTML = '<span></span>';

            container.appendChild(hidden);
            container.appendChild(checkbox);
            container.appendChild(label);


            return container;
        }

        function init_switcher23(button) {
            button.addEventListener('click', function (e) {

                e.stopPropagation();

                if (this.value > 0) {
                    this.value = 0;
                    this.previousSibling.value = 0;
                    this.removeAttribute('checked');
                } else {
                    this.value = 1;
                    this.previousSibling.value = 1;
                    this.setAttribute('checked', 'checked');
                }

                //Trigger the event
                if (this.getAttribute('data-event').length > 0) {
                    //window.removeEventListener(this.getAttribute('data-event'));

                    let data = {
                        self: this,
                        ajax_action: this.getAttribute('data-ajax-action'),
                        name: this.previousSibling.getAttribute('name'),
                        post_id: this.getAttribute('data-post-id'),
                        value: parseInt(this.value, 10),
                        custom_data: null
                    };

                    if (this.getAttribute('data-custom-data') && this.getAttribute('data-custom-data').length > 0) {
                        data.custom_data = JSON.parse(this.getAttribute('data-custom-data'));
                    }

                    document.dispatchEvent(new CustomEvent(this.getAttribute('data-event'), {detail: data}));

                    //this.setAttribute('data-event-attached', 1);
                }



                return true;
            });
        }