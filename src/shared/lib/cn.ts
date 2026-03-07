import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * TailwindCSS 클래스를 동적으로 병합하고 충돌을 방지하는 유틸리티 함수
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
