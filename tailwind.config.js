module.exports = {
    purge: [],
    theme: {
        extend: {},
        screens: {
            'xl': { 'max': '1920px' },
            // => @media (max-width: 1920px) { ... }
            'lg': { 'max': '1280px' },
            // => @media (max-width: 1280px) { ... }
            'md': { 'max': '960px' },
            // => @media (max-width: 960px) { ... }
            'sm': { 'max': '600px' },
            // => @media (max-width: 600px) { ... }
            'xs': { 'max': '414px' }
        },
    },
    variants: {
        textColor: ['hover', 'group-hover'],
        opacity: ['hover', 'group-hover'],
        transform: ['group-hover'],
        translate: ['group-hover'],
        borderWidth: ['responsive', 'hover'],
        backgroundOpacity: ['responsive', 'hover', 'focus', 'group-hover'],
        display: ['responsive', 'group-hover'],
    },
    plugins: [],
    corePlugins: {
        // outline: false,
    },
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
}
