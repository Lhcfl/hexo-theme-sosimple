const defaultThemeConfig = {
  keywords: 'blog',
  author: 'you',
  description: '',
  defaultTheme: 'light',
};

export type ThemeConfig = {
  keywords: string;
  author: string;
  description?: string;
  defaultTheme: 'light' | 'dark' | undefined;

  favicon: string;

  menu: Record<string, string>;

  toc_max_depth: number;

  footer: {
    text?: string;
    html?: string;
    enable_powered_by?: boolean;
  };

  style: {
    post_excerpt: {
      summary_mode?: boolean;
    };
    post_meta: {
      date_format: string;
      show_icon: boolean;
    };
  };

  comment?: {
    enable?: 'gitalk';
    gitalk?: {
      clientID: string;
      clientSecret: string;
      repo: string;
      owner: string;
      admin: string[];
      distractionFreeMode?: boolean;
    };
  };
};
