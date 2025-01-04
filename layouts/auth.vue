<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="auth-sidebar">
      <h1 class="auth-title">Desa Cimareme</h1>
      <NuxtImg src="/images/page/auth/illustration.png" class="auth-image" />
    </div>
    <div class="auth-main">
      <div class="auth-header">
        <div class="text-customPrimary-500">
          <h1 class="auth-welcome">Selamat Datang di</h1>
          <h1 class="auth-name-app">e-Voting</h1>
        </div>
        <NuxtImg
          src="/images/logo/kabupaten_bandung_barat.png"
          class="auth-logo"
        />
      </div>
      <div class="form-container">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-sidebar {
  @apply hidden lg:h-screen lg:flex lg:flex-col lg:items-center lg:justify-center lg:bg-customPrimary-500 lg:w-[50%] xl:w-[60%] 2xl:w-[70%];
}

.auth-title {
  @apply text-white text-[40px] font-bold;
}

.auth-image {
  @apply lg:w-[450px] xl:w-[500px] 2xl:w-[600px];
}

.auth-main {
  @apply w-full h-screen flex flex-col items-center lg:w-[50%] xl:w-[40%] 2xl:w-[30%];
}

.auth-header {
  @apply h-[20%] mb-auto mt-10 px-0 lg:px-10 flex items-center justify-center gap-4;
}

.form-container {
  @apply w-full h-[50%] px-8 md:px-10 lg:px-20;
}

.auth-welcome {
  @apply font-semibold text-xl mb-1 md:mb-0 md:text-[28px] md:leading-[46px] lg:text-[28px] lg:leading-[46px] xl:text-[24px] xl:leading-[42px] 2xl:text-[26px] 2xl:leading-[46px];
}

.auth-name-app {
  @apply font-bold text-3xl md:text-[56px] md:leading-[88px] lg:text-[56px] lg:leading-[50px] xl:text-[44px] xl:leading-[36px];
}

.auth-logo {
  @apply w-[80px] md:w-[133px] xl:w-[100px] 2xl:w-[110px];
}
</style>
