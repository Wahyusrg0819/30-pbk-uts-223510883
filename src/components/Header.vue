<template>
  <div class="Header">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" to="/">TodoList-Wahyu Siregar</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/"
              :class="{ active: selectedMenu === 'Todos' }"
              @click="selectedMenu = 'Todos'"
            >
              <span>Todos</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/post"
              :class="{ active: selectedMenu === 'Post' }"
              @click="selectedMenu = 'Post'"
            >
              <span>Post</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/album"
              :class="{ active: selectedMenu === 'Album' }"
              @click="selectedMenu = 'Album'"
            >
              <span>Album</span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedMenu = ref('Todos');
</script>

<style scoped>
.Header {
  padding: 10px;
  margin-bottom: 10px;
  background-color: #6e6f70;
  transition: box-shadow 0.3s ease;
}

.Header:hover {
  box-shadow: 0 0 20px rgba(7, 113, 234, 1.5);
}

.nav-link {
  color: #f8f9fa;
  --btn-default-bg: rgb(41, 41, 41);
  --btn-padding: 15px 20px;
  --btn-hover-bg: rgb(51, 51, 51);
  --btn-transition: 0.3s;
  --btn-letter-spacing: 0.1rem;
  --btn-animation-duration: 1.2s;
  --btn-shadow-color: rgba(0, 0, 0, 0.137);
  --btn-shadow: 0 2px 10px 0 var(--btn-shadow-color);
  --hover-btn-color: #fac921;
  --default-btn-color: #fff;
  --font-size: 16px;
  --font-weight: 600;
  --font-family: Menlo, Roboto Mono, monospace;
  box-sizing: border-box;
  padding: var(--btn-padding);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--default-btn-color);
  font: var(--font-weight) var(--font-size) var(--font-family);
  background: var(--btn-default-bg);
  border: none;
  cursor: pointer;
  transition: var(--btn-transition);
  overflow: hidden;
  box-shadow: var(--btn-shadow);
  margin-right: 5px;
}

.nav-link span {
  letter-spacing: var(--btn-letter-spacing);
  transition: var(--btn-transition);
  box-sizing: border-box;
  position: relative;
  background: inherit;
}

.nav-link span::before {
  box-sizing: border-box;
  position: absolute;
  content: '';
  background: inherit;
}

.nav-link:hover,
.nav-link:focus {
  background: var(--btn-hover-bg);
}

.nav-link:hover span,
.nav-link:focus span {
  color: var(--hover-btn-color);
}

.nav-link:hover span::before,
.nav-link:focus span::before {
  animation: chitchat linear both var(--btn-animation-duration);
}

@keyframes chitchat {
  0% {
    content: '#';
  }
  5% {
    content: '.';
  }
  10% {
    content: '^{';
  }
  15% {
    content: '-!';
  }
  20% {
    content: '#$_';
  }
  25% {
    content: '№:0';
  }
  30% {
    content: '#{+.';
  }
  35% {
    content: '@}-?';
  }
  40% {
    content: '?{4@%';
  }
  45% {
    content: '=.,^!';
  }
  50% {
    content: '?2@%';
  }
  55% {
    content: '\;1}]';
  }
  60% {
    content: '?{%:%';
  }
  65% {
    content: '|{f[4';
  }
  70% {
    content: '{4%0%';
  }
  75% {
    content: "'1_0<";
  }
  80% {
    content: '{0%';
  }
  85% {
    content: "]>'";
  }
  90% {
    content: '4';
  }
  95% {
    content: '2';
  }
  100% {
    content: '';
  }
}
</style>
