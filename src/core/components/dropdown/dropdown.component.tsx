import { bind } from '@/core/styles/bind'
import styles from './dropdown.module.scss'
import { Button } from '../button/button.component'
import { DotsVerticalIcon } from '@/core/icons'
import { useRef, useState } from 'react'
import { useOnClickOutside } from '@/core/hooks/use-on-click-outside.hook'
const cn = bind(styles)

interface Props {
    children: React.ReactNode;
    className?: string;
}

export const Dropdown = ({ children, className }: Props) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    useOnClickOutside(dropdownRef, () => setIsOpen(false));
    return (
        <div className={cn("dropdown")} ref={dropdownRef}>
            <Button className={cn("dropdown__toggle", {"dropdown__toggle--active": isOpen})} color="text" label={<DotsVerticalIcon />} onClick={() => setIsOpen(!isOpen)} />
            <div className={cn("dropdown__content", className,{"dropdown__content--visible": isOpen})}>
                {children}
            </div>
        </div>
    )
}