const defaultThemeConfig = {
  keywords: 'blog',
  author: 'you',
  description: '',
  defaultTheme: 'light-mode',
};

export type ThemeConfig = {
  keywords: string;
  author: string;
  description?: string;
  defaultTheme: string;

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
};
