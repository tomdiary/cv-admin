<template>
  <article class="post-item">
    <section class="post-item-section">
      <div class="post-img">
        <a href="javascript:void(0);">
          <img src="https://eu2.contabostorage.com/464dea8dd831432693002120bbd0ae61:sheep/wallhaven-z83wqo.jpg" />
        </a>
      </div>
      <div class="post-details">
        <div class="post-details-meta">
          <div class="time">2022-05-10 17:23</div>
          <span>-</span>
          <div class="classify">JavaScript</div>
          <span>-</span>
          <div class="read-num">12k</div>
        </div>
        <div class="post-details-title">
          <h2>
            <a href="javascript:void(0);">你无法改变世界，但你可以改变自己</a>
          </h2>
        </div>
        <div class="post-details-describe">
          <p>你无法改变世界，但你可以改变自己。你无法改变世界，但你可以改变自己。你无法改变世界，但你可以改变自己。你无法改变世界，但你可以改变自己。你无法改变世界，但你可以改变自己。你无法改变世界，但你可以改变自己。你无法改变世界，但你可以改变自己。</p>
        </div>
      </div>
    </section>
  </article>
</template>

<script setup>
</script>

<style scoped lang="scss">
.post-item {
  width: 1000px;
  background-color: #FFF;

  .post-item-section {
    display: grid;
    grid-template-columns: 400px auto;
    grid-template-rows: 280px;
    padding: 20px;

    .post-img {
      margin: calc(20px * -1);
      margin-inline-end: 20px;

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .post-details {
      display: flex;
      flex-direction: column;
      // display: grid;
      // grid-template-columns: 100%;
      // grid-template-rows: 46px 1fr minmax(100px, 1fr);

      .post-details-meta {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 46px;
        border-bottom: 1px solid #ececec;

        .read-num,
        .classify,
        .time {
          display: inline-block;
        }

        span {
          margin: 0 12px;
        }
      }

      .post-details-title {
        min-height: 50px;
        max-height: 100px;
        display: flex;
        align-items: center;
        font-size: 20px;
        color: #333;
      }

      .post-details-describe {
        color: #CCC;
        letter-spacing: 0.1px;
        overflow : hidden;
        font-size: 18px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
