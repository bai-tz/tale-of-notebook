/* =========================================================
   Tale of Notebook · 交互逻辑
   图片位置：把图片放进 images/，在 works 的 images 数组里填写路径，
   单图为一张，系列图可放多张；留空数组时显示柔和占位。
   ========================================================= */

const works = [
  {
    no: '01',
    title: '蓝色伤口：海洋污染拼贴',
    english: 'Wounded Ocean',
    category: 'COLLAGE / POSTER',
    year: '2026',
    desc: '把海洋生物、渔网、塑料瓶、易拉罐与消费标语拼贴成一个蓝色球体。明亮海面之下，是被垃圾缠绕的生态，用强烈对比讨论海洋污染。',
    tags: ['拼贴海报', '生态议题', '海洋污染'],
    motif: 'icon-snowflake',
    theme: ['#d9e9ef', '#eaf3f4', '#c5d8e5'],
    images: ['./images/ocean-pollution.png']
  },
  {
    no: '02',
    title: 'Museum Goer：青年观展路线研究',
    english: 'Museum Goer',
    category: 'UX RESEARCH',
    year: '2026',
    desc: '围绕青年观众在博物馆里的打卡式观展与拥挤问题，整理需求、痛点与解决方案，并输出多条导览路线和信息可视化版面。',
    tags: ['用户研究', '信息设计', '导览系统'],
    motif: 'icon-butterfly',
    theme: ['#d8e2ea', '#eef0e6', '#cbd9de'],
    images: ['./images/museum-goer.png']
  },
  {
    no: '03',
    title: '像素世界：无限可能',
    english: 'Pixel World',
    category: 'GAME DESIGN',
    year: '2026',
    desc: '一套像素风游戏世界观设定：从像素角色定义、招式设计、色彩对话到地图物件与代码拼接，展示无限可能的像素创作实验。',
    tags: ['像素美术', '游戏设定', '视觉叙事'],
    motif: 'icon-sakura',
    theme: ['#f4e7a8', '#d8e8cf', '#bcd8e6'],
    images: ['./images/pixel-world.png']
  },
  {
    no: '04',
    title: '消失与重生：武汉历史街区的时间地图',
    english: 'A Temporal Map of Wuhan',
    category: 'DATA VISUALIZATION',
    year: '2026',
    desc: '以空间转译为方法，把武汉历史街区的位置、拆建、功能演变与影像资料整理成时间地图；用数据处理、地图层叠与网页原型呈现城市的消失与重生。',
    tags: ['时间地图', '城市研究', '数据可视化'],
    motif: 'icon-snowflake',
    theme: ['#dce3e8', '#eef1f2', '#c9d7df'],
    images: ['./images/wuhan-temporal-map.png']
  },
  {
    no: '05',
    title: '楚地有声：湖北方言可视化',
    english: 'Voices of Chu',
    category: 'INFORMATION DESIGN',
    year: '2026',
    desc: '三张一组的信息设计海报，围绕湖北方言的地理分布、使用频率、声学特征与声调调形展开。把方言数据转化为地图、图表与声音隐喻，让地域语言被看见。',
    tags: ['方言可视化', '信息图谱', '系列海报'],
    motif: 'icon-butterfly',
    theme: ['#d7e9e6', '#edf3e8', '#c9dce4'],
    images: [
      './images/chudi-1.png',
      './images/chudi-3.png',
      './images/chudi-2.png'
    ]
  }
];

const defaultEntries = {
  identity: {
    kicker: 'ID CARD',
    title: '个人信息',
    detail: '姓名：纸间\n城市：杭州\n身份：视觉传达设计 / 信息可视化\n宣言：把复杂的信息，整理成可以翻阅的故事。',
    minHeight: 174,
    maxHeight: 240
  },
  intro: {
    kicker: 'SQUARE NOTE',
    title: '小小的介绍',
    detail: '喜欢把复杂的议题变成看得懂的视觉故事。\n做过信息可视化、用户研究、导览系统与像素风游戏设定，也在练习用更温柔的颜色说话。',
    minHeight: 116,
    maxHeight: 220
  },
  preference: {
    kicker: 'LONG NOTE',
    title: '心爱之物',
    detail: '喜欢的主题：海洋生态、城市记忆、方言文化\n喜欢的媒介：信息图表、地图、拼贴、像素游戏\n喜欢的细节：清晰的层级、柔软的配色、带一点手作感的纹理\n喜欢的状态：把散乱资料慢慢整理成一张有秩序的图。',
    minHeight: 186,
    maxHeight: 300
  },
  philosophy: {
    kicker: 'CREED CARD',
    title: '创作理念',
    detail: '设计，是替信息找到合适的形状。\n先理解问题，再决定风格；让数据有温度，也让观点被看见。\n希望作品既能被读懂，也能留下一点余韵。',
    minHeight: 174,
    maxHeight: 250
  }
};

const STORAGE_KEY = 'tale-of-notebook-entries-v2';
const entries = JSON.parse(JSON.stringify(defaultEntries));

try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  Object.keys(entries).forEach((id) => {
    if (saved[id] && typeof saved[id].detail === 'string') entries[id].detail = saved[id].detail;
  });
} catch (error) {
  // 本地存储不可用时直接使用默认内容
}

const stage = document.getElementById('stage');
const notebook = document.getElementById('notebook');
const strap = document.getElementById('strap');
const topTip = document.getElementById('topTip');
const soundBtn = document.getElementById('soundBtn');
const sparkleLayer = document.getElementById('sparkleLayer');
const leftPaperContent = document.getElementById('leftPaperContent');
const centerPaperContent = document.getElementById('centerPaperContent');
const centerPaper = document.getElementById('centerPaper');
const leftPaper = document.getElementById('leftPaper');
const flippingSheet = document.getElementById('flippingSheet');
const sheetFront = document.getElementById('sheetFront');
const sheetBack = document.getElementById('sheetBack');
const rightDetail = document.getElementById('rightDetail');
const modal = document.getElementById('itemModal');
const modalClose = document.getElementById('modalClose');
const modalKicker = document.getElementById('modalKicker');
const modalTitle = document.getElementById('modalTitle');
const modalEditor = document.getElementById('modalEditor');
const orientationOverlay = document.getElementById('orientationOverlay');

const slots = Array.from(document.querySelectorAll('.slot'));
const items = Array.from(document.querySelectorAll('.float-item'));

const MAX_PAGE = works.length + 1;
const FLIP_TIME = 780;

let bookState = 'closed';
let isReady = false;
let pageIndex = 0;
let isFlipping = false;
let soundOn = true;
let audioCtx = null;
let modalItemId = null;
let orientationDismissed = false;
let paperClickSuppressed = false;

function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function setTip(text) {
  topTip.textContent = text;
}

function saveEntries() {
  try {
    const data = {};
    Object.keys(entries).forEach((id) => { data[id] = { detail: entries[id].detail }; });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    // 忽略存储失败
  }
}

function playChime(type) {
  if (!soundOn) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    audioCtx = audioCtx || new AudioCtx();
    const frequencies = type === 'ready' ? [523.25, 659.25, 783.99] : [392, 523.25];
    frequencies.forEach((frequency, index) => {
      const oscillator = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      const start = audioCtx.currentTime + index * 0.11;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.07, start + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.38);
      oscillator.connect(gain);
      gain.connect(audioCtx.destination);
      oscillator.start(start);
      oscillator.stop(start + 0.4);
    });
  } catch (error) {
    // 浏览器阻止音频时静默处理
  }
}

/* ---------- 卡片内容与长度 ---------- */
function resizeNoteItem(item) {
  if (!item.classList.contains('item-note')) return;
  const entry = entries[item.dataset.id];
  if (!entry) return;
  const extra = Math.max(0, entry.detail.length - 36);
  const height = Math.min(entry.maxHeight, entry.minHeight + Math.ceil(extra / 16) * 10);
  item.style.height = `${height}px`;
}

function applyEntryToItem(item) {
  const entry = entries[item.dataset.id];
  if (!entry) return;
  const summary = item.querySelector('.item-summary');
  if (summary && !item.classList.contains('is-inserted')) {
    summary.textContent = entry.detail.split('\n')[0].slice(0, 18) || entry.title;
  }
  resizeNoteItem(item);
}

/* ---------- 打开 / 合上三折手账 ---------- */
async function openNotebook() {
  if (bookState !== 'closed') return;
  bookState = 'opening';
  strap.blur();
  notebook.classList.add('is-strap-aside');
  setTip('最上面一页向右翻，中间一页向左摊开');

  await sleep(180);
  notebook.classList.add('is-right-open');
  await sleep(920);
  notebook.classList.add('is-open');
  await sleep(920);

  bookState = 'open';
  stage.classList.add('items-ready');
  renderPaper();
  if (!isReady) setTip('点击卡片查看，拖到对应插袋；放齐后翻纸张');
  else setTip('纸张可以点击或从右往左滑，带子可随时合上');
}

async function closeNotebook() {
  if (bookState !== 'open') return;
  bookState = 'closing';
  stage.classList.remove('items-ready');
  closeModal();
  notebook.classList.remove('is-open');
  setTip('左页向右合上，再合中间一页');

  await sleep(920);
  notebook.classList.remove('is-right-open');
  await sleep(920);
  notebook.classList.remove('is-strap-aside');

  bookState = 'closed';
  pageIndex = 0;
  renderPaper();
  setTip('点击带子，打开这一本小小的手账');
}

strap.addEventListener('click', () => {
  if (bookState === 'closed') openNotebook();
  else if (bookState === 'open') closeNotebook();
});

strap.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    strap.click();
  }
});

soundBtn.addEventListener('click', () => {
  soundOn = !soundOn;
  soundBtn.setAttribute('aria-pressed', String(soundOn));
  soundBtn.querySelector('.sound-label').textContent = soundOn ? '音效开' : '音效关';
  if (soundOn) playChime('tap');
});

/* ---------- 拖拽卡片 / 便签 ---------- */
let dragState = null;

function acceptedSlot(item) {
  return slots.find((slot) => slot.dataset.accepts === item.dataset.id) || null;
}

function showSlotHints(item) {
  slots.forEach((slot) => slot.classList.toggle('is-hint', slot.dataset.accepts === item.dataset.id));
}

function clearSlotHints() {
  slots.forEach((slot) => slot.classList.remove('is-hint'));
}

function returnToScatter(item) {
  item.style.left = item.dataset.x;
  item.style.top = item.dataset.y;
}

function checkReady() {
  if (isReady) return;
  const inserted = items.filter((item) => item.classList.contains('is-inserted')).length;
  if (inserted !== items.length) return;

  isReady = true;
  notebook.classList.add('is-ready');
  setTip('准备完毕！点击或滑动中间的纸张翻阅作品');
  spawnSparkles();
  playChime('ready');
}

function spawnSparkles() {
  for (let i = 0; i < 14; i += 1) {
    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle';
    sparkle.innerHTML = '<svg viewBox="0 0 24 24"><use href="#icon-sparkle"></use></svg>';
    sparkle.style.left = `${12 + Math.random() * 76}%`;
    sparkle.style.top = `${14 + Math.random() * 68}%`;
    sparkle.style.setProperty('--dx', `${(Math.random() - 0.5) * 46}px`);
    sparkle.style.setProperty('--dy', `${-30 - Math.random() * 48}px`);
    sparkle.style.animationDelay = `${Math.random() * 0.3}s`;
    sparkleLayer.appendChild(sparkle);
    window.setTimeout(() => sparkle.remove(), 2200);
  }
}

function setupDraggable(item) {
  item.addEventListener('pointerdown', (event) => {
    if (bookState !== 'open' || item.classList.contains('is-inserted')) return;
    const stageRect = stage.getBoundingClientRect();
    const rect = item.getBoundingClientRect();
    dragState = {
      item,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      left: rect.left - stageRect.left + rect.width / 2,
      top: rect.top - stageRect.top + rect.height / 2,
      moved: false
    };
    item.setPointerCapture(event.pointerId);
    item.classList.add('is-dragging');
    showSlotHints(item);
  });

  item.addEventListener('pointermove', (event) => {
    if (!dragState || dragState.item !== item) return;
    const dx = event.clientX - dragState.startX;
    const dy = event.clientY - dragState.startY;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) dragState.moved = true;
    item.style.left = `${dragState.left + dx}px`;
    item.style.top = `${dragState.top + dy}px`;
  });

  item.addEventListener('pointerup', (event) => {
    if (!dragState || dragState.item !== item) return;
    const moved = dragState.moved;
    const slot = acceptedSlot(item);
    dragState = null;
    item.classList.remove('is-dragging');
    clearSlotHints();

    if (!moved) {
      returnToScatter(item);
      openModal(item.dataset.id);
      return;
    }

    if (slot) {
      const rect = slot.getBoundingClientRect();
      const inside = event.clientX >= rect.left - 26 && event.clientX <= rect.right + 26 &&
        event.clientY >= rect.top - 26 && event.clientY <= rect.bottom + 26;
      if (inside) {
        insertItem(item, slot);
        return;
      }
    }

    returnToScatter(item);
    item.dataset.suppressClick = 'true';
    window.setTimeout(() => { delete item.dataset.suppressClick; }, 100);
  });

  item.addEventListener('pointercancel', () => {
    if (!dragState || dragState.item !== item) return;
    dragState = null;
    item.classList.remove('is-dragging');
    clearSlotHints();
    returnToScatter(item);
  });

  item.addEventListener('click', () => {
    if (item.dataset.suppressClick) return;
    if (item.classList.contains('is-inserted')) openModal(item.dataset.id);
  });
}

function insertItem(item, slot) {
  const well = slot.querySelector('.slot-well');
  well.appendChild(item);
  item.classList.add('is-inserted');
  item.style.left = '';
  item.style.top = '';
  item.querySelector('.insert-label').textContent = slot.dataset.label;
  item.setAttribute('aria-label', `${slot.dataset.label}，点击查看详细内容`);
  resizeNoteItem(item);
  checkReady();
}

/* ---------- 放大编辑弹窗 ---------- */
function openModal(id) {
  const entry = entries[id];
  if (!entry) return;
  modalItemId = id;
  modalKicker.textContent = entry.kicker;
  modalTitle.textContent = entry.title;
  modalEditor.innerText = entry.detail;
  modal.hidden = false;
  window.setTimeout(() => modalEditor.focus(), 30);
}

function closeModal() {
  modal.hidden = true;
  modalItemId = null;
}

modalClose.addEventListener('click', closeModal);
modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.hidden) closeModal();
});

modalEditor.addEventListener('input', () => {
  if (!modalItemId) return;
  entries[modalItemId].detail = modalEditor.innerText;
  const item = items.find((candidate) => candidate.dataset.id === modalItemId);
  if (item) applyEntryToItem(item);
  saveEntries();
});

/* ---------- 纸张内容与翻页 ---------- */
function workImages(work) {
  if (Array.isArray(work.images)) return work.images.filter(Boolean);
  return work.image ? [work.image] : [];
}

function inspirationMarkup() {
  return `
    <div class="inspiration-page">
      <h4>创作灵感</h4>
      <p>留给贴纸、速写与突然出现的小念头。后续的小元素会慢慢住进这里。</p>
      <div class="inspiration-slots">
        <span class="inspiration-slot">贴纸 / 速写</span>
        <span class="inspiration-slot">色纸 / 票根</span>
        <span class="inspiration-slot">随手记录</span>
        <span class="inspiration-slot">待放的小元素</span>
      </div>
    </div>
  `;
}

function centerEmptyMarkup() {
  return `
    <div class="center-empty">
      <svg aria-hidden="true"><use href="#icon-sakura"></use></svg>
    </div>
  `;
}

function trifoldMarkup(work) {
  const images = workImages(work);
  return `
    <div class="trifold" data-trifold="true">
      <div class="trifold-panel trifold-panel-a"><img src="${images[0]}" alt="${work.title}：方言分布与使用频率" decoding="async" /></div>
      <div class="trifold-panel trifold-panel-b"><img src="${images[1]}" alt="${work.title}：方言调形分布研究" decoding="async" /></div>
      <div class="trifold-panel trifold-panel-c"><img src="${images[2]}" alt="${work.title}：湖北方言分布与语言信息图谱" decoding="async" /></div>
    </div>
  `;
}

function directoryMarkup() {
  return `
    <h4>作品目录</h4>
    <ol class="directory-list">
      ${works.map((work) => `<li><span>${work.no}</span>${work.title}</li>`).join('')}
    </ol>
  `;
}

function workCenterMarkup(work) {
  const images = workImages(work);
  if (images.length > 1) return trifoldMarkup(work);
  if (!images.length) return centerEmptyMarkup();
  return `<div class="center-art"><img src="${images[0]}" alt="${work.title} 作品图片" decoding="async" /></div>`;
}

function centerMarkupFor(index) {
  if (index === 0) return directoryMarkup();
  if (index <= works.length) return workCenterMarkup(works[index - 1]);
  return centerEmptyMarkup();
}

function leftMarkupFor() {
  return inspirationMarkup();
}

function renderRightDetail(index = pageIndex) {
  if (index === 0) {
    rightDetail.innerHTML = '';
    return;
  }

  if (index > works.length) {
    rightDetail.innerHTML = `
      <div class="detail-card">
        <h3>翻完啦，刚刚是我最后一个作品了。</h3>
        <p>谢谢你把这一本小小的手账翻到最后。想重新看一遍，就从右往左把纸张翻回去，或点击旁边的带子合上它。</p>
      </div>
    `;
    return;
  }

  const work = works[index - 1];
  const hint = work.images.length > 1
    ? '点击中间纸张左侧，风琴式展开三折页；展开后点击任意位置收回；未展开时点击右侧翻下一页。'
    : '点击中间纸张的右侧，翻到下一页。';

  rightDetail.innerHTML = `
    <div class="detail-card">
      <h3>${work.title}</h3>
      <p>${work.desc}</p>
      <div class="detail-tags">${work.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
      <p class="detail-hint">${hint}</p>
    </div>
  `;
}

function renderPaper(index = pageIndex) {
  detachTrifoldClose();
  notebook.classList.toggle('is-ended', index > works.length);
  notebook.classList.toggle('has-left-page', index > 0);
  leftPaperContent.innerHTML = index > 0 ? leftMarkupFor() : '';
  centerPaperContent.innerHTML = centerMarkupFor(index);
  renderRightDetail(index);
}

function flipPage(direction) {
  if (!isReady || isFlipping || bookState !== 'open') return;
  detachTrifoldClose();
  const target = pageIndex + (direction === 'next' ? 1 : -1);
  if (target < 0 || target > MAX_PAGE) return;

  isFlipping = true;
  const forward = direction === 'next';
  sheetFront.innerHTML = forward ? centerMarkupFor(pageIndex) : centerMarkupFor(target);
  sheetBack.innerHTML = leftMarkupFor();

  flippingSheet.classList.remove('is-flipping', 'is-reverse');
  if (!forward) flippingSheet.classList.add('is-reverse');
  void flippingSheet.offsetWidth;
  flippingSheet.classList.add('is-flipping');

  window.setTimeout(() => {
    centerPaperContent.innerHTML = centerMarkupFor(target);
    notebook.classList.toggle('is-ended', target > works.length);
    notebook.classList.toggle('has-left-page', target > 0);
    leftPaperContent.innerHTML = target > 0 ? leftMarkupFor() : '';
    renderRightDetail(target);
  }, FLIP_TIME / 2);

  window.setTimeout(() => {
    flippingSheet.classList.remove('is-flipping', 'is-reverse');
    pageIndex = target;
    renderPaper();
    isFlipping = false;
  }, FLIP_TIME + 40);
}

/* 中页交互：左侧悬停抬起三折页，点击展开/合上；右侧点击翻下一页 */
let paperStartX = null;

function paperRatio(event) {
  const rect = centerPaper.getBoundingClientRect();
  return (event.clientX - rect.left) / rect.width;
}

function foldedRatio(event) {
  const trifold = currentTrifold();
  if (!trifold) return paperRatio(event);
  const rect = trifold.getBoundingClientRect();
  return (event.clientX - rect.left) / rect.width;
}

function currentTrifold() {
  return centerPaperContent.querySelector('.trifold');
}

let trifoldCloseHandler = null;

function detachTrifoldClose() {
  if (!trifoldCloseHandler) return;
  document.removeEventListener('pointerdown', trifoldCloseHandler, true);
  document.removeEventListener('click', trifoldCloseHandler, true);
  trifoldCloseHandler = null;
}

function closeTrifoldOnAnyClick(event) {
  const trifold = currentTrifold();
  if (!trifold || !trifold.classList.contains('is-open')) {
    detachTrifoldClose();
    return;
  }
  trifold.classList.remove('is-open', 'is-hover');
  detachTrifoldClose();
  paperClickSuppressed = true;
  window.setTimeout(() => { paperClickSuppressed = false; }, 180);
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
}

function attachTrifoldClose() {
  detachTrifoldClose();
  trifoldCloseHandler = closeTrifoldOnAnyClick;
  document.addEventListener('pointerdown', trifoldCloseHandler, true);
  document.addEventListener('click', trifoldCloseHandler, true);
}

centerPaper.addEventListener('pointerdown', (event) => {
  if (!isReady || isFlipping) return;
  paperStartX = event.clientX;
  centerPaper.setPointerCapture(event.pointerId);
});

centerPaper.addEventListener('pointermove', (event) => {
  if (!isReady || isFlipping) return;
  const trifold = currentTrifold();
  if (!trifold) return;
  trifold.classList.toggle('is-hover', !trifold.classList.contains('is-open') && foldedRatio(event) < 0.5);
});

centerPaper.addEventListener('pointerleave', () => {
  const trifold = currentTrifold();
  if (trifold) trifold.classList.remove('is-hover');
});

centerPaper.addEventListener('pointerup', (event) => {
  if (paperStartX === null) return;
  const distance = event.clientX - paperStartX;
  paperStartX = null;
  const trifold = currentTrifold();
  if (trifold && trifold.classList.contains('is-open')) {
    closeTrifoldOnAnyClick(event);
    return;
  }
  if (Math.abs(distance) < 42) return;
  paperClickSuppressed = true;
  window.setTimeout(() => { paperClickSuppressed = false; }, 120);
  flipPage(distance < 0 ? 'next' : 'prev');
});

centerPaper.addEventListener('pointercancel', () => { paperStartX = null; });

centerPaper.addEventListener('click', (event) => {
  if (paperClickSuppressed || !isReady || isFlipping) return;
  const trifold = currentTrifold();

  if (trifold) {
    if (trifold.classList.contains('is-open')) {
      closeTrifoldOnAnyClick(event);
      return;
    }
    if (foldedRatio(event) < 0.5) {
      trifold.classList.add('is-open');
      trifold.classList.remove('is-hover');
      attachTrifoldClose();
      return;
    }
  }

  flipPage('next');
});

/* 左侧纸张点击或向右滑动，翻回中间 */
let leftPaperStartX = null;

leftPaper.addEventListener('pointerdown', (event) => {
  if (!isReady || isFlipping) return;
  leftPaperStartX = event.clientX;
  leftPaper.setPointerCapture(event.pointerId);
});

leftPaper.addEventListener('pointerup', (event) => {
  if (leftPaperStartX === null) return;
  const distance = event.clientX - leftPaperStartX;
  leftPaperStartX = null;
  if (distance < 42) return;
  paperClickSuppressed = true;
  window.setTimeout(() => { paperClickSuppressed = false; }, 120);
  flipPage('prev');
});

leftPaper.addEventListener('pointercancel', () => { leftPaperStartX = null; });

leftPaper.addEventListener('click', () => {
  if (paperClickSuppressed || !isReady || isFlipping) return;
  flipPage('prev');
});

/* ---------- 手机横屏提示 ---------- */
function updateOrientationHint() {
  const isPhone = window.innerWidth <= 700;
  const isPortrait = window.innerHeight > window.innerWidth;
  if (!isPortrait) orientationDismissed = false;
  orientationOverlay.hidden = !(isPhone && isPortrait && !orientationDismissed);
}

orientationOverlay.addEventListener('click', () => {
  orientationDismissed = true;
  orientationOverlay.hidden = true;
});
window.addEventListener('resize', updateOrientationHint);
window.addEventListener('orientationchange', updateOrientationHint);

/* ---------- 初始化 ---------- */
items.forEach((item) => {
  applyEntryToItem(item);
  setupDraggable(item);
});
renderPaper();
updateOrientationHint();
setTip('点击带子，打开这一本小小的手账');
