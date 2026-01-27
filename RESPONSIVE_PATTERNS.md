# 🎯 Quick Reference - Responsive Design Patterns

## Copy-Paste Ready Classes

### 1. Container Wrapper
```jsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
  {/* Your content */}
</div>
```

### 2. Section Padding
```jsx
<section className="py-8 sm:py-12 md:py-16 lg:py-20">
  {/* Section content */}
</section>
```

### 3. Hero Title
```jsx
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
  Your Hero Title
</h1>
```

### 4. Section Title
```jsx
<h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
  Section Title
</h2>
```

### 5. Body Text
```jsx
<p className="text-sm sm:text-base md:text-lg">
  Your paragraph text here
</p>
```

### 6. Button (Touch-Optimized)
```jsx
<button className="px-6 py-3 sm:px-8 sm:py-4 min-h-[44px] rounded-xl bg-primary-600 text-white font-semibold hover:shadow-lg transition-all">
  Click Me
</button>
```

### 7. Icon Button
```jsx
<button className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors">
  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
</button>
```

### 8. Card Component
```jsx
<div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all">
  {/* Card content */}
</div>
```

### 9. Grid - 4 Columns
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
  {/* Grid items */}
</div>
```

### 10. Grid - 3 Columns
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  {/* Grid items */}
</div>
```

### 11. Grid - 2 Columns
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
  {/* Grid items */}
</div>
```

### 12. Flex - Stack to Row
```jsx
<div className="flex flex-col sm:flex-row gap-4 items-center">
  {/* Flex items */}
</div>
```

### 13. Search Input
```jsx
<div className="relative">
  <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
  <input
    type="text"
    placeholder="Search..."
    className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
  />
</div>
```

### 14. Icon Box
```jsx
<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center shadow-lg">
  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
</div>
```

### 15. Horizontal Scroll (Mobile)
```jsx
<div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-hide">
  <button className="whitespace-nowrap min-h-[44px] px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white">
    Filter 1
  </button>
  <button className="whitespace-nowrap min-h-[44px] px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white">
    Filter 2
  </button>
</div>
```

### 16. Hide on Mobile
```jsx
<div className="hidden md:block">
  Desktop only content
</div>
```

### 17. Mobile Only
```jsx
<div className="block md:hidden">
  Mobile only content
</div>
```

### 18. Responsive Image
```jsx
<img 
  src="image.jpg" 
  alt="Description"
  className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover rounded-xl"
  loading="lazy"
/>
```

### 19. Badge/Tag
```jsx
<span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary-100 text-primary-700 text-xs sm:text-sm font-medium">
  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
  Badge Text
</span>
```

### 20. Modal/Dialog Content
```jsx
<div className="w-full max-w-md sm:max-w-lg md:max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
  {/* Modal content */}
</div>
```

---

## 🎨 Color Patterns

### Primary Gradient Button
```jsx
className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800"
```

### Glass Effect
```jsx
className="bg-white/10 backdrop-blur-sm"
```

### Hover Lift
```jsx
className="hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
```

---

## 📱 Breakpoint Values

```jsx
// Tailwind default breakpoints
xs: '320px'   // Not default, custom
sm: '640px'   // Tailwind default
md: '768px'   // Tailwind default
lg: '1024px'  // Tailwind default
xl: '1280px'  // Tailwind default
2xl: '1536px' // Tailwind default
```

---

## ✅ Checklist for New Components

When creating a new component, ensure:

- [ ] Title uses responsive sizing: `text-2xl sm:text-3xl md:text-4xl...`
- [ ] Body text uses: `text-sm sm:text-base md:text-lg`
- [ ] Container has: `px-4 sm:px-6 lg:px-8`
- [ ] Section has: `py-8 sm:py-12 md:py-16`
- [ ] Buttons have: `min-h-[44px]`
- [ ] Icons scale: `h-4 w-4 sm:h-5 sm:w-5`
- [ ] Cards have: `p-4 sm:p-6` and `rounded-xl sm:rounded-2xl`
- [ ] Grids stack: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- [ ] Flex stacks: `flex-col sm:flex-row`
- [ ] Touch targets are 44x44px minimum

---

## 🚀 Common Patterns by Page Type

### Landing Page Hero
```jsx
<section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
      Hero Title
    </h1>
    <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8">
      Description text
    </p>
    <button className="px-6 sm:px-8 py-3 sm:py-4 min-h-[44px] rounded-xl">
      CTA Button
    </button>
  </div>
</section>
```

### List Page with Filters
```jsx
<section className="py-8 sm:py-10 md:py-12">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    {/* Horizontal scroll filters on mobile, wrap on desktop */}
    <div className="flex gap-2 sm:gap-3 overflow-x-auto sm:flex-wrap pb-2 mb-6 sm:mb-8">
      {/* Filter buttons */}
    </div>
    
    {/* Grid of items */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {/* Cards */}
    </div>
  </div>
</section>
```

### Detail Page
```jsx
<div className="py-8 sm:py-12">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      {/* Main content - 2/3 width on desktop */}
      <div className="lg:col-span-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
          Title
        </h1>
        {/* Content */}
      </div>
      
      {/* Sidebar - 1/3 width on desktop, below on mobile */}
      <div className="lg:col-span-1">
        {/* Sidebar content */}
      </div>
    </div>
  </div>
</div>
```

---

## 💡 Pro Tips

1. **Mobile First:** Start with smallest size, add `sm:`, `md:`, `lg:` as needed
2. **Touch Targets:** Always use `min-h-[44px]` on clickable elements
3. **Consistent Spacing:** Use the same gap patterns across pages
4. **Icons Scale:** Always include responsive sizing for icons
5. **Test Small:** Check 320px width (iPhone SE) to catch overflow issues
6. **Use Flex Gap:** Instead of margins, use `gap-4 sm:gap-6`
7. **Round Corners:** Use `rounded-xl sm:rounded-2xl` for cards
8. **Padding Progression:** Follow 3→4→5→6 pattern for card padding
9. **Typography Scale:** Follow 2xl→3xl→4xl→5xl→6xl pattern
10. **Container Width:** Always wrap in `container mx-auto px-4 sm:px-6 lg:px-8`

---

## 🎯 Quick Test

To test if your component is responsive:

1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test these widths:
   - **320px** (iPhone SE)
   - **375px** (iPhone 12)
   - **768px** (iPad)
   - **1024px** (Laptop)
   - **1920px** (Desktop)

Check for:
- ❌ Horizontal scroll
- ❌ Text overflow
- ❌ Tiny buttons
- ❌ Squeezed content
- ✅ Smooth scaling
- ✅ Readable text
- ✅ Tappable buttons
- ✅ Beautiful layout

---

**Happy Coding!** 🚀
