export const getWrapperClasses = (expanded: boolean, pathName: string) => {
    if (expanded) {
        return `
    flex items-center h-16 w-full rounded-lg cursor-pointer
    bg-sidebarbuttonnotselectedbg
    hover:bg-sidebarbuttonhoverbg transition-all duration-200
    ${pathName == '/settings' ? 'bg-sidebarbuttonbg' : ''}
    px-3 justify-between
  `;
    } else {
        return `
    flex items-center h-16 w-full rounded-lg cursor-pointer
    bg-sidebarbuttonnotselectedbg
    hover:bg-sidebarbuttonhoverbg transition-all duration-200
    ${pathName == '/settings' ? 'bg-sidebarbuttonbg' : ''} px-0 justify-center
  `;
    }
};
export const getBottomButtonClass = (expanded: boolean, pathName: string) => {
    if (expanded) {
        return `
    flex items-center h-16 w-full rounded-lg cursor-pointer
    bg-sidebarbuttonnotselectedbg
    hover:bg-sidebarbuttonhoverbg transition-all duration-200
    ${pathName == '/settings' ? 'bg-sidebarbuttonbg' : ''}
    px-3 pr-1.5 justify-between
  `;
    } else {
        return `
    flex items-center h-16 w-full rounded-lg cursor-pointer
    bg-sidebarbuttonnotselectedbg
    hover:bg-sidebarbuttonhoverbg transition-all duration-200
    ${pathName == '/settings' ? 'bg-sidebarbuttonbg' : ''} px-0 justify-center
  `;
    }
};
