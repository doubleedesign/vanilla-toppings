import{n as e}from"./chunk-BneVvdWh.js";import{n as t,t as n}from"./with-runtime-scss-DDgYeJR4.js";var r,i,a,o;e((()=>{n(),r={title:`Animate on hover/Underline`,tags:[`autodocs`],args:{color:`currentColor`,duration:`0.3s`,size:`1px`},argTypes:{color:{control:{type:`color`},description:`Color of the underline`,table:{type:{summary:`string`},defaultValue:{summary:`currentColor`}}},duration:{control:{type:`text`},description:`Duration of the animation in seconds (e.g., "0.3s")`,table:{type:{summary:`string`},defaultValue:{summary:`0.3s`}}},size:{control:{type:`text`},description:`Thickness of the underline (e.g., "1px", "0.25rem")`,table:{type:{summary:`string`},defaultValue:{summary:`1px`}}}},parameters:{docs:{subtitle:`Animated underline on hover/focus using an SCSS mixin.`,source:{type:`code`,language:`scss`,transform:(e,{args:t})=>{let{color:n,duration:r,size:i}=t;return`
                        .fancy-link {
                            @include underline-on-hover(${n}, ${r}, ${i});
                        }
                      `.trim()}}}},decorators:[t(`assets/underline-demo.scss`,`underline-from-center`)]},i={render:()=>{let e=document.createElement(`div`);e.id=`underline-demo`;let t=document.createElement(`a`);return t.className=`fancy-link-underline`,t.href=`#`,t.textContent=`Example link`,e.appendChild(t),e}},a={tags:[`!autodocs`],args:{size:`5px`,color:`hotpink`},render:()=>{let e=document.createElement(`div`);e.id=`underline-demo`;let t=document.createElement(`a`);t.className=`fancy-link-underline fancy-link-underline--large`,t.href=`#`,t.textContent=`Example linky link`;let n=document.createElement(`p`);return n.textContent=`This example includes larger, bolder text and a larger default underline to demonstrate how the underline behaves with regard to descenders.`,e.appendChild(t),e.appendChild(n),e},parameters:{controls:{exclude:[`size`,`color`]}}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.id = 'underline-demo';
    const example = document.createElement('a');
    example.className = 'fancy-link-underline';
    example.href = '#';
    example.textContent = 'Example link';
    container.appendChild(example);
    return container;
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  tags: ['!autodocs'],
  args: {
    size: '5px',
    color: 'hotpink'
  },
  render: () => {
    const container = document.createElement('div');
    container.id = 'underline-demo';
    const example = document.createElement('a');
    example.className = 'fancy-link-underline fancy-link-underline--large';
    example.href = '#';
    example.textContent = 'Example linky link';
    const caption = document.createElement('p');
    // eslint-disable-next-line max-len
    caption.textContent = 'This example includes larger, bolder text and a larger default underline to demonstrate how the underline behaves with regard to descenders.';
    container.appendChild(example);
    container.appendChild(caption);
    return container;
  },
  parameters: {
    controls: {
      exclude: ['size', 'color']
    }
  }
}`,...a.parameters?.docs?.source}}},o=[`Basic`,`Large`]}))();export{i as Basic,a as Large,o as __namedExportsOrder,r as default};