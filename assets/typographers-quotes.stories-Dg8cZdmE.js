import{n as e}from"./chunk-BneVvdWh.js";var t,n=e((()=>{t=class{selectors;root;constructor({selectors:e,root:t=document}){this.selectors=e,this.root=t}apply(){this.selectors.forEach(e=>{this.root.querySelectorAll(e).forEach(e=>{this.processChildren(e)})})}processChildren(e){e.childNodes.forEach(e=>{e.nodeType===Node.TEXT_NODE?e.textContent=this.replaceQuotes(e.textContent||``):e.nodeType===Node.ELEMENT_NODE&&![`CODE`,`PRE`,`SCRIPT`,`STYLE`].includes(e.tagName)&&this.processChildren(e)})}replaceQuotes(e){return e.replaceAll(/"([^"]*)"/g,`“$1”`).replaceAll(/'([^']*)'/g,`‘$1’`).replaceAll(/(\S)'/g,`$1’`).replaceAll(/([^ ])‘/g,`$1’`).replaceAll(/'/g,`’`)}}})),r,i,a;e((()=>{n(),r={title:`Typographer’s Quotes`,tags:[`autodocs`],args:{selectors:[`.quotes-example`],root:document},argTypes:{selectors:{description:`An array of CSS selectors to identify which elements the plugin should process.`,control:{disable:!0},table:{type:{summary:`string[]`},defaultValue:{summary:`[]`}}},root:{description:`The root element or document to search within.`,control:{disable:!0},table:{type:{summary:`Document | Element`},defaultValue:{summary:`document`}}}},parameters:{docs:{subtitle:`A simple plugin to replace straight quotation marks and apostrophes with proper ‘curly’ characters.`,description:{component:`Replaces quote characters within the given elements and their children upon rendering in the browser, except for quotes in preformatted or code elements. Intended for rendering content in scenarios where you do not control the source, or it is simply more convenient to allow typing straight quotes such as writing in Markdown files that are then rendered by a static site generator or other system.`},source:{type:`code`,language:`javascript`,code:`
                    import { TypographersQuotes } from '@doubleedesign/clientside-typographers-quotes';
                    
                    const instance = new TypographersQuotes(['.quotes-example']);
                    instance.apply();
                `}}}},i={render:e=>{let t=document.createElement(`div`);return t.className=`quotes-example`,t.innerHTML=`<p>You don't have a TV? What's all your furniture pointed at? 
            Should I use my invisibility to fight crime or for evil? "Come on, Ross, you're a paleontologist. Dig a little deeper."</p>
            <code>const messers = "messees";</code>
            <p>What was I thinking at dinner? "Do you want soup or salad?" Both! Always order both!</p>
            <p>'Where do you want to go to lunch?' 'Mama's Little Bakery, Chicago, Illinois.'</p>
        `,t},play:({args:e})=>{new t(e).apply()},parameters:{docs:{story:{autoplay:!0}}}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: (args: TypographersQuotesParams) => {
    const example = document.createElement('div');
    example.className = 'quotes-example';
    const content = \`<p>You don't have a TV? What's all your furniture pointed at? 
            Should I use my invisibility to fight crime or for evil? "Come on, Ross, you're a paleontologist. Dig a little deeper."</p>
            <code>const messers = "messees";</code>
            <p>What was I thinking at dinner? "Do you want soup or salad?" Both! Always order both!</p>
            <p>'Where do you want to go to lunch?' 'Mama's Little Bakery, Chicago, Illinois.'</p>
        \`;
    example.innerHTML = content;
    return example;
  },
  play: ({
    args
  }) => {
    const instance = new TypographersQuotes(args);
    instance.apply();
  },
  parameters: {
    docs: {
      story: {
        autoplay: true
      }
    }
  }
}`,...i.parameters?.docs?.source}}},a=[`Basic`]}))();export{i as Basic,a as __namedExportsOrder,r as default};