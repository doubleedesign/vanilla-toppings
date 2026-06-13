import{n as e}from"./chunk-BneVvdWh.js";import{n as t,t as n}from"./with-runtime-scss-DDgYeJR4.js";var r,i,a;e((()=>{n(),r={title:`Animate on hover/Fill from left`,tags:[`autodocs`],args:{color:`purple`,duration:`0.3s`},argTypes:{color:{control:{type:`color`},description:`Background colour of the fill`,table:{type:{summary:`string`},defaultValue:{summary:`currentColor`}}},duration:{control:{type:`text`},description:`Duration of the animation in seconds (e.g., "0.3s")`,table:{type:{summary:`string`},defaultValue:{summary:`0.3s`}}}},parameters:{docs:{subtitle:`Animated background fill on hover using an SCSS mixin.`,source:{type:`code`,language:`scss`,transform:(e,{args:t})=>{let{color:n,duration:r}=t;return`
                        .fancy-link {
                            @include fill-from-left(${n}, ${r});
                        }
                      `.trim()}}}},decorators:[t(`assets/fill-demo.scss`,`fill-from-left`)]},i={render:()=>{let e=document.createElement(`div`);e.id=`fill-from-left-demo`;let t=document.createElement(`a`);return t.className=`fancy-link-fill`,t.href=`#`,t.textContent=`Example link`,e.appendChild(t),e}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => {
    const container = document.createElement('div');
    container.id = 'fill-from-left-demo';
    const example = document.createElement('a');
    example.className = 'fancy-link-fill';
    example.href = '#';
    example.textContent = 'Example link';
    container.appendChild(example);
    return container;
  }
}`,...i.parameters?.docs?.source}}},a=[`Basic`]}))();export{i as Basic,a as __namedExportsOrder,r as default};