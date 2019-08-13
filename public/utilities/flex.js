export default {
  title: 'Flex',
  preview: `
  <div class="d-flex p-2">I'm a flexbox container!</div>
  `,
  items: [
    {
      title: 'Basic use',
      content: `
<div class="d-flex p-2">I'm a flexbox container!</div>
      `,
    },
    {
      title: '',
      content: `
<div class="d-inline-flex p-2">I'm an inline flexbox container!</div>
<div class="d-inline-flex p-2">I'm an inline flexbox container!</div>
      `,
    },
    {
      title: 'Horisontal direction',
      content: `
<div class="d-flex flex-row mb-3">
  <div class="p-2">Flex item 1</div>
  <div class="p-2">Flex item 2</div>
  <div class="p-2">Flex item 3</div>
</div>
<div class="d-flex flex-row-reverse">
  <div class="p-2">Flex item 1</div>
  <div class="p-2">Flex item 2</div>
  <div class="p-2">Flex item 3</div>
</div>
      `,
    },
    {
      title: 'Vertical direction',
      content: `
<div class="d-flex flex-column mb-3">
  <div class="p-2">Flex item 1</div>
  <div class="p-2">Flex item 2</div>
  <div class="p-2">Flex item 3</div>
</div>
<div class="d-flex flex-column-reverse">
  <div class="p-2">Flex item 1</div>
  <div class="p-2">Flex item 2</div>
  <div class="p-2">Flex item 3</div>
</div>
      `,
    },
  ],
};
