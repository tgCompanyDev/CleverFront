import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LinkItem } from './ui/LinkItem';
import { RoutePath } from '@/pages/routeConfig';
import { BarChartOutlined, RiseOutlined, RobotOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons';
import { classNames } from '@/shared/libs/helpers';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const mainLinks = [
  {
    href: RoutePath.controlPanel,
    title: "Панель управления",
    icon: <SettingOutlined />
  },
  {
    href: RoutePath.promote,
    title: "Продвижение",
    icon: <RiseOutlined />
  },
  {
    href: RoutePath.clients,
    title: "Клиенты",
    icon: <TeamOutlined />
  },
  {
    href: RoutePath.analytic,
    title: "Аналитика",
    icon: <BarChartOutlined />
  },
  {
    href: RoutePath.constructor,
    title: "Конструктор",
    icon: <RobotOutlined />
  },
]

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={classNames(
        "absolute left-0 top-0 z-9999 h-screen lg:static lg:translate-x-0",
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        "flex flex-col overflow-y-hidden",
        "duration-300 ease-linear",
        "bg-white shadow-[5px_0px_6px_-3px_rgba(34,80,58,0.3)]"
      )}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-6 lg:py-6.5">
        <NavLink to="/" className="font-bold text-xl">
          BOTAMBA
        </NavLink>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          =
        </button>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <ul className="mb-6 flex flex-col gap-1.5">
            {mainLinks.map((link, index) => (
              <LinkItem {...link} key={index} active={pathname === link.href || pathname.includes(link.href)} />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
