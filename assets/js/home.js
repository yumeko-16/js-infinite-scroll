const list = document.querySelector('#infinite-list');
let page = 1;
let loading = false;

async function loadMoreItems() {
  if (loading) return;
  loading = true;

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const data = await response.json();

    if (data.length > 0) {
      data.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item.title;
        list.appendChild(li);
      });
      page++;
    } else {
      observer.disconnect();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading = false;
  }
}

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadMoreItems();
  }
});

const sentinel = document.querySelector('#sentinel');
observer.observe(sentinel);
