import { createApp, h } from 'vue';
import Modal from '../components/dialog/modal.vue';

export default {
  install(app: any) {
    const showModal = (options: any) => {
      return new Promise((resolve) => {
        const container = document.createElement('div');
        const instance = createApp({
          render: () => h(Modal, {
            ...options,
            visible: true,
            'onUpdate:visible': (val: boolean) => {
              if (!val) setTimeout(() => {
                instance.unmount();
                container.remove();
              }, 300);
            },
            onConfirm: (value: any) => resolve({ confirm: true, content: value }),
            onCancel: () => resolve({ confirm: false })
          })
        });
        instance.mount(container);
        document.body.appendChild(container);
      });
    };
    app.config.globalProperties.$showModal = showModal;
  }
}; 