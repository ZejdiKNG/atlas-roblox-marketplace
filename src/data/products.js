export const PRODUCTS = [
  {
    id: "prod-combat-v3",
    title: "Sovereign Combat & Melee Engine v3.4",
    category: "Core Systems",
    tagline: "Server-authoritative hitbox detection, combo chaining, raycast slashing & block/parry logic.",
    price: 24.99,
    rating: 4.96,
    reviewsCount: 142,
    fileType: ".RBXL + .RBXM",
    studioVersion: "Roblox Studio 2026 Compatible",
    downloadsCount: 1840,
    badge: "Bestseller",
    coverGradient: "from-red-950 via-zinc-900 to-black",
    accentColor: "#ef233c",
    previewImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    features: [
      "Sub-millisecond client prediction & server validation",
      "Spatial query & raycast based weapon collision (no laggy Touched events)",
      "Dynamic 4-hit combo strings, aerial launches & ground slams",
      "Directional parry system with slow-mo visual effect & sound sync",
      "Complete weapon configuration ModuleScripts (swords, daggers, scythes)",
      "Strict Luau typed code, zero external libraries required"
    ],
    codeSnippet: `-- Example: Sovereign Melee Combo Controller
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local CombatFramework = require(ReplicatedStorage.Packages.SovereignCombat)

local playerWeapon = CombatFramework.Weapon.new({
    Name = "Shadow Katana",
    ComboWindow = 0.42,
    DamageMultiplier = 1.25,
    CanParry = true,
})

playerWeapon:OnComboHit(function(targetHumanoid, hitInfo)
    print("Hit confirmed on:", targetHumanoid.Parent.Name, "at combo stage:", hitInfo.Stage)
end)`
  },
  {
    id: "prod-tycoon-core",
    title: "Nexus Complete Modular Tycoon Core",
    category: "Complete Games",
    tagline: "Automated plot allocation, multi-currency droppers, persistent DataStore2 save & rebirth loop.",
    price: 34.50,
    rating: 4.92,
    reviewsCount: 98,
    fileType: ".RBXL (Full Place File)",
    studioVersion: "Roblox Studio 2026 Compatible",
    downloadsCount: 960,
    badge: "Popular",
    coverGradient: "from-amber-950 via-zinc-900 to-black",
    accentColor: "#f59e0b",
    previewImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
    features: [
      "Dynamic chunk streaming & auto-cleaning Conveyor system",
      "Session-locking DataStore2 logic (zero inventory wipe glitches)",
      "Configurable upgrader multipliers, auto-collectors and rebirth trees",
      "Animated cash and diamond GUI HUD with custom numbers formatter (1.5M, 2.4B)",
      "Complete 4-player ready island map included"
    ],
    codeSnippet: `local TycoonEngine = require(script.Parent.TycoonCore)
local plot = TycoonEngine.ClaimPlot(player)
plot:UnlockTier("Heavy Refinery", {
    Cost = 15000,
    Currency = "Cash",
    OnUnlock = function(part)
        part.ParticleEmitter.Enabled = true
    end
})`
  },
  {
    id: "prod-inventory-trade",
    title: "Quantum Inventory & Trade Hub v2",
    category: "Core Systems",
    tagline: "Grid-based bag system, rarity glows, secure peer-to-peer trade with countdown confirmation.",
    price: 18.00,
    rating: 4.98,
    reviewsCount: 215,
    fileType: ".RBXM + Setup Guide",
    studioVersion: "Roblox Studio 2026 Compatible",
    downloadsCount: 3100,
    badge: "Staff Pick",
    coverGradient: "from-purple-950 via-zinc-900 to-black",
    accentColor: "#a855f7",
    previewImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    features: [
      "Stackable items, custom tooltips, item inspection 3D viewport",
      "Strict exploit-proof server trade verification (double verification check)",
      "Rarity tier colors (Common -> Mythic -> Divine)",
      "Hotbar drag-and-drop equipped slots with mobile touch support",
      "Easily link with any shop or currency system"
    ],
    codeSnippet: `local InventoryService = require(game.ServerScriptService.InventoryService)
InventoryService.AwardItem(player, "Void Dagger", {
    Rarity = "Legendary",
    Durability = 100,
    Prefix = "Godly"
})`
  },
  {
    id: "prod-vfx-weather",
    title: "AuraFX: Cinematic Weather & Shaders",
    category: "VFX & Shaders",
    tagline: "Volumetric atmospheric fog, realistic rain puddles, lightning storms and post-processing presets.",
    price: 14.99,
    rating: 4.89,
    reviewsCount: 76,
    fileType: ".RBXL + Lighting Presets",
    studioVersion: "Roblox Studio 2026 Compatible",
    downloadsCount: 1420,
    badge: "Trending",
    coverGradient: "from-cyan-950 via-zinc-900 to-black",
    accentColor: "#06b6d4",
    previewImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    features: [
      "GPU-friendly particle rain with dynamic ground splash rings",
      "Realistic day-night cycle with smooth moon phases and shadows",
      "Procedural lightning strikes with realistic audio distance delay",
      "5 one-click atmosphere presets: Cyberpunk, Grim Dark, Sunny High-Fantasy, Horror Fog, Winter Blizzard",
      "Zero FPS drops on low-end mobile devices"
    ],
    codeSnippet: `local WeatherFX = require(game.ReplicatedStorage.AuraFX)
WeatherFX:SetWeather("Thunderstorm", {
    TransitionTime = 3.5,
    LightningIntensity = 0.8,
    WetSurfaceReflection = true
})`
  },
  {
    id: "prod-scifi-map",
    title: "Neo-Veridia Cyberpunk Megacity Kit",
    category: "Maps & Environments",
    tagline: "Optimized modular city blocks, neon signs, working transit trains and interior apartments.",
    price: 39.99,
    rating: 4.95,
    reviewsCount: 64,
    fileType: ".RBXL Place File (320MB)",
    studioVersion: "Roblox Studio 2026 Compatible",
    downloadsCount: 720,
    badge: "Premium Build",
    coverGradient: "from-blue-950 via-zinc-900 to-black",
    accentColor: "#3b82f6",
    previewImage: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80",
    features: [
      "Over 450+ unique optimized modular building assets",
      "Streamed level LOD setup for ultra-smooth 60+ FPS performance",
      "Fully modeled interiors for convenience stores, lobbies, and rooftops",
      "Automated monorail system carrying players around the skyline",
      "All neon signs have configurable text and flickering emission"
    ],
    codeSnippet: `-- Plug & Play modular asset kit
-- Includes organized Workspace folders:
-- Workspace.City.Infrastructure
-- Workspace.City.Props
-- Workspace.City.LightingEmitters`
  },
  {
    id: "prod-dark-ui-kit",
    title: "Vanguard Modern Studio UI / HUD Kit",
    category: "UI Kits",
    tagline: "40+ responsive UI screens, Roact/Fusion compatible, sound effects and smooth tween animations.",
    price: 12.00,
    rating: 4.99,
    reviewsCount: 310,
    fileType: ".RBXM + Figma File",
    studioVersion: "Roblox Studio 2026 Compatible",
    downloadsCount: 4200,
    badge: "Essential",
    coverGradient: "from-rose-950 via-zinc-900 to-black",
    accentColor: "#f43f5e",
    previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    features: [
      "Includes Settings Menu, Shop, Quest Log, Party System & Chat redesign",
      "Fully responsive for Mobile (phones & tablets), PC and Console Gamepads",
      "Pre-built TweenService opening & closing transitions",
      "UI Sound pack included (buttons, errors, purchases, swooshes)",
      "Dark theme & Clean minimalist aesthetic"
    ],
    codeSnippet: `local VanguardUI = require(ReplicatedStorage.VanguardUI)
local shopModal = VanguardUI.Components.ShopModal.new({
    Theme = "DarkCrimson",
    SoundsEnabled = true
})
shopModal:Open()`
  }
];

export const CATEGORIES = [
  "All",
  "Complete Games",
  "Core Systems",
  "VFX & Shaders",
  "UI Kits",
  "Maps & Environments"
];
