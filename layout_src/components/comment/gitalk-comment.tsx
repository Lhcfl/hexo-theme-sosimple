import { h, type Component } from '@/lib/jsx-runtime';
import type { HexoLocale } from '@/lib/hexo-data';
import { getThemeConfig } from '@/lib/types-trick';
import type { PageSchema, PostSchema } from 'hexo/dist/types';
import { i18n } from '@/lib/i18n';

export const GitalkComment: Component<{ hexo: HexoLocale; item: PageSchema | PostSchema }> = ({ hexo, item }) => {
  const slot_id = 'gitalk-comment-slot';
  const gitalk = getThemeConfig(hexo).comment?.gitalk;
  if (!gitalk) return '';

  const gitalk_config = JSON.stringify({
    clientID: gitalk.clientID,
    clientSecret: gitalk.clientSecret,
    repo: gitalk.repo,
    owner: gitalk.owner,
    admin: gitalk.admin,
    id: (item.title || item.source || 'undefined').slice(0, 49),
    distractionFreeMode: gitalk.distractionFreeMode,
  });

  return (
    <div class="comment-container">
      {/* <script>Utils.loadCSS("https://unpkg.com/gitalk/dist/gitalk.css");</script> */}
      <script
        defer
        src="https://unpkg.com/gitalk/dist/gitalk.min.js"
        onload={`(new Gitalk(${gitalk_config})).render("${slot_id}")`}
      />
      <div id={slot_id}>Loading...</div>
    </div>
  );
};
