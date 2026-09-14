# Development Server Info

## 🚀 Server Status

The Vite development server is **already running** on port 8443 as part of Figma Make.

### What This Means

✅ **You don't need to run `npm run dev` manually**  
✅ **The server auto-restarts when needed**  
✅ **Hot reload is already active**  
✅ **Preview is available through Figma Make**

## 📝 Expected Behavior

### When You See This Error:
```
Error: Port 8443 is already in use
```

**This is NORMAL and EXPECTED!** ✅

The server is already running in the background through Figma Make.

## 🔧 How to Work

### Making Changes
1. Edit your files in `src/`
2. Save the file
3. Changes automatically reload in the preview
4. No need to restart anything!

### Viewing Your App
- Access through the **Figma Make preview panel**
- The preview URL is managed by Figma Make
- Hot reload works automatically

## ⚠️ Only Run `npm run dev` If:

1. The preview panel shows "Server not running"
2. You need to restart after a crash
3. You're debugging server issues

## 🛠️ Common Commands

```bash
# Build for production (safe to run anytime)
npm run build

# Preview production build (uses different port)
npm run preview

# Format code (safe to run anytime)
npm run format

# Type check (safe to run anytime)
npx tsc --noEmit
```

## 🐛 Troubleshooting

### If the preview isn't updating:
1. Check if the file saved properly
2. Look for errors in the browser console
3. Check the Figma Make console for errors

### If you need to restart the server:
1. Use Figma Make's built-in restart function
2. Or stop the current process and run `npm run dev`

### To stop the background server:
```bash
# Find the process
netstat -ano | findstr :8443

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

## ✅ Configuration Fixed

The following Vite warnings have been fixed:
- ✅ `__dirname` → `import.meta.dirname`
- ✅ JSON import now uses `with { type: 'json' }`

These warnings will no longer appear on the next server restart.

## 📚 More Info

See **AGENTS.md** for complete Figma Make development guidelines.

---

**TL;DR**: The server is already running. Just edit files and they'll reload automatically! 🚀
