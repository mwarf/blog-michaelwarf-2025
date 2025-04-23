"use client";

import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, MoveRight, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle"; // Import the ThemeToggle

// Define the types for the navigation items
interface NavItem {
    title: string;
    href?: string;
    description?: string;
    items?: SubNavItem[];
}

interface SubNavItem {
    title: string;
    href: string;
}

// Define the props for the Header1 component
interface Header1Props {
    navigationItems: NavItem[];
}

function Header1({ navigationItems }: Header1Props) {
    const [isOpen, setOpen] = useState(false);

    return (
        <header className="w-full z-40 fixed top-0 left-0 bg-background">
            {/* Changed container to match Footer: max-w-screen-xl, specific padding */}
            <div className="relative mx-auto max-w-screen-xl px-4 lg:px-8 min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
                {/* Navigation Section */}
                <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
                    <NavigationMenu className="flex justify-start items-start">
                        <NavigationMenuList className="flex justify-start gap-4 flex-row">
                            {navigationItems.map((item) => (
                                <NavigationMenuItem key={item.title}>
                                    {item.href ? (
                                        // Standard pattern: Item -> Link (asChild) -> a
                                        <NavigationMenuLink asChild>
                                            <a
                                                href={item.href}
                                                className="font-medium text-sm data-[active]:bg-accent/50 h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
                                            >
                                                {item.title}
                                            </a>
                                        </NavigationMenuLink>
                                    ) : (
                                        // Structure for potential future dropdowns
                                        <>
                                            <NavigationMenuTrigger className="font-medium text-sm">
                                                {item.title}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent className="!w-[450px] p-4">
                                                {/* Placeholder for dropdown content */}
                                                <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                                                    <div className="flex flex-col h-full justify-between">
                                                        <div className="flex flex-col">
                                                            <p className="text-base">{item.title}</p>
                                                            <p className="text-muted-foreground text-sm">
                                                                {item.description || 'Default description'}
                                                            </p>
                                                        </div>
                                                        <Button size="sm" className="mt-10">
                                                            Book a call today {/* Example button */}
                                                        </Button>
                                                    </div>
                                                    <div className="flex flex-col text-sm h-full justify-end">
                                                        {item.items?.map((subItem) => (
                                                            <NavigationMenuLink asChild key={subItem.title}>
                                                                <a
                                                                    href={subItem.href}
                                                                    className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded"
                                                                >
                                                                    <span>{subItem.title}</span>
                                                                    <MoveRight className="w-4 h-4 text-muted-foreground" />
                                                                </a>
                                                            </NavigationMenuLink>
                                                        ))}
                                                    </div>
                                                </div>
                                            </NavigationMenuContent>
                                        </>
                                    )}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Site Title/Logo Section */}
                <div className="flex lg:justify-center">
                    <p className="font-semibold">michaelwarf.com</p>
                </div>

                {/* Right-side Actions Section */}
                <div className="flex justify-end w-full gap-4 items-center">
                    <Button asChild>
                      <a href="/services">Inquire</a>
                    </Button>
                    <ThemeToggle />
                </div>

                {/* Mobile Menu Button */}
                <div className="flex w-12 shrink lg:hidden items-end justify-end">
                    <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                    {/* Mobile Menu Content */}
                    {isOpen && (
                        <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-background shadow-lg p-4 container gap-8">
                            {navigationItems.map((item) => (
                                <div key={item.title}>
                                    <div className="flex flex-col gap-2">
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                className="flex justify-between items-center"
                                                onClick={() => setOpen(false)}
                                            >
                                                <span className="text-lg">{item.title}</span>
                                                <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                                            </a>
                                        ) : (
                                            <p className="text-lg">{item.title}</p>
                                        )}
                                        {item.items &&
                                            item.items.map((subItem) => (
                                                <a
                                                    key={subItem.title}
                                                    href={subItem.href}
                                                    className="flex justify-between items-center"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <span className="text-muted-foreground">
                                                        {subItem.title}
                                                    </span>
                                                    <MoveRight className="w-4 h-4 stroke-1" />
                                                </a>
                                            ))}
                                    </div>
                                </div>
                            ))}
                            <div className="mt-4 border-t pt-4">
                                <ThemeToggle />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export { Header1 };
