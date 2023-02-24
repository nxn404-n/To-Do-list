const clearCompletedButton = document.querySelector('.clearCompletedButton');
export function clearCompletedEvent() {
    clearCompletedButton.addEventListener('click', () => {
      this.clearCompleted();
    });
}