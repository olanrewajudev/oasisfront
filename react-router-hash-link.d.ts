declare module 'react-router-hash-link' {
    import { LinkProps, NavLinkProps } from 'react-router-dom';
    import * as React from 'react';
  
    export interface HashLinkProps extends LinkProps {
      smooth?: boolean;
      scroll?: (el: HTMLElement) => void;
    }
  
    export interface NavHashLinkProps extends NavLinkProps {
      smooth?: boolean;
      scroll?: (el: HTMLElement) => void;
    }
  
    export const HashLink: React.FC<HashLinkProps>;
    export const NavHashLink: React.FC<NavHashLinkProps>;
  }
  