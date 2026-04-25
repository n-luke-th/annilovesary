<template>
  <ul
    class="menu bg-amber-400 dark:bg-base-200 shadow-2xl shadow-sky-600 dark:shadow-warning border-3 border-primary-content rounded-box max-w-56 dropdown-content dropdown-bottom dropdown-hover space-y-0.5 top-18"
    tabindex="-1"
  >
    <li>
      <a data-set-theme="light">Light</a>
    </li>
    <li>
      <a data-set-theme="dark">Dark</a>
    </li>
    <li>
      <a data-set-theme="valentine">Valentine</a>
    </li>
    <li>
      <a data-set-theme="halloween">Halloween</a>
    </li>
    <li>
      <a data-set-theme="sunset">Sunset</a>
    </li>

    <li>
      <details open>
        <summary>More Themes</summary>
        <ul class="p-2 w-40 z-1">
          <!-- <li><a data-set-theme="aqua">Aqua</a></li> -->
          <li><a data-set-theme="cupcake">Cupcake</a></li>
          <li><a data-set-theme="forest">Forest</a></li>
        </ul>
      </details>
    </li>
  </ul>
</template>
