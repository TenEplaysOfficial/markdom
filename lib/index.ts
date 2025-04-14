type TOC = { level: number; id: string; title: string };

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
}

function renderTOCHTML(toc: TOC[]): string {
  const generateList = (level: number, toc: TOC[]) => {
    const items = toc
      .filter((item) => item.level === level)
      .map(
        (item) =>
          `<li class="toc-level-${item.level}"><a href="#${item.id}">${item.title}</a></li>`,
      )
      .join('');
    if (items) {
      return `<ul>${items}</ul>`;
    }
    return '';
  };

  return toc
    .reduce((acc: string[], item: TOC) => {
      if (acc[item.level - 1]) {
        acc[item.level - 1] +=
          `<li class="toc-level-${item.level}"><a href="#${item.id}">${item.title}</a></li>`;
      } else {
        acc[item.level - 1] =
          `<ul><li class="toc-level-${item.level}"><a href="#${item.id}">${item.title}</a></li></ul>`;
      }
      return acc;
    }, [])
    .join('');
}

function parse(md: string): { html: string; toc: TOC[] } {
  const toc: TOC[] = [];

  const renderHeading = (
    level: number,
    title: string,
    collect: boolean,
  ): string => {
    const id = slugify(title);
    if (collect) toc.push({ level, id, title });
    return `<h${level} id="${id}"><a href="#${id}" class="heading-anchor">🔗</a> ${title}</h${level}>`;
  };

  const parseSection = (md: string, collectTOC: boolean): string => {
    return md
      .replace(
        /```([\s\S]*?)```/g,
        (_, code) => `<pre><code>${code.trim()}</code></pre>`,
      )
      .replace(/^###### (.+)$/gm, (_, t) => renderHeading(6, t, collectTOC))
      .replace(/^##### (.+)$/gm, (_, t) => renderHeading(5, t, collectTOC))
      .replace(/^#### (.+)$/gm, (_, t) => renderHeading(4, t, collectTOC))
      .replace(/^### (.+)$/gm, (_, t) => renderHeading(3, t, collectTOC))
      .replace(/^## (.+)$/gm, (_, t) => renderHeading(2, t, collectTOC))
      .replace(/^# (.+)$/gm, (_, t) => renderHeading(1, t, collectTOC))
      .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2" />')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
      .replace(/\n{2,}/g, '</p><p>')
      .replace(
        /^((?!<h\d|<pre|<ul|<ol|<li|<code|<div|<img|<a|<strong|<em|<p).+)$/gm,
        '<p>$1</p>',
      );
  };

  const [beforeTOC, afterTOC = ''] = md.split(/<!--\s*TOC-HERE\s*-->/i);
  const htmlBefore = parseSection(beforeTOC, false);
  const htmlAfter = parseSection(afterTOC, true);
  const tocHTML = renderTOCHTML(toc);

  const finalHTML = `${htmlBefore}<!-- TOC-HERE -->${htmlAfter}`.replace(
    /<!--\s*TOC-HERE\s*-->/i,
    tocHTML,
  );

  return {
    html: finalHTML,
    toc,
  };
}

export const markdom = { parse };
export default markdom;
