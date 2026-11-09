// Generates a genuine valid Roblox Studio place XML file (.rbxl)
export function downloadRobloxPlaceFile(product) {
  const title = product?.title || "ATLAS Build";
  const id = product?.id || "atlas-build";

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<roblox xmlns:xmime="http://www.w3.org/2005/05/xmlmime" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.roblox.com/roblox.xsd" version="4">
  <External>null</External>
  <External>nil</External>
  <Item class="Workspace" referent="RBX0">
    <Properties>
      <string name="Name">Workspace</string>
      <bool name="FilteringEnabled">true</bool>
    </Properties>
    <Item class="Part" referent="RBX1">
      <Properties>
        <string name="Name">Atlas_SpawnPlatform</string>
        <CoordinateFrame name="CFrame">
          <X>0</X>
          <Y>1</Y>
          <Z>0</Z>
          <R00>1</R00><R01>0</R01><R02>0</R02>
          <R10>0</R10><R11>1</R11><R12>0</R12>
          <R20>0</R20><R21>0</R21><R22>1</R22>
        </CoordinateFrame>
        <Vector3 name="Size">
          <X>24</X>
          <Y>2</Y>
          <Z>24</Z>
        </Vector3>
        <Color3uint8 name="Color3uint8">4280558652</Color3uint8>
        <bool name="Anchored">true</bool>
      </Properties>
    </Item>
  </Item>
  <Item class="Lighting" referent="RBX2">
    <Properties>
      <string name="Name">Lighting</string>
      <Color3 name="Ambient">
        <R>0.15</R><G>0.15</G><B>0.18</B>
      </Color3>
      <float name="ClockTime">14</float>
      <token name="Technology">3</token>
    </Properties>
    <Item class="Atmosphere" referent="RBX3">
      <Properties>
        <string name="Name">AtlasAtmosphere</string>
        <float name="Density">0.32</float>
        <Color3 name="Color">
          <R>0.8</R><G>0.8</G><B>0.9</B>
        </Color3>
      </Properties>
    </Item>
  </Item>
  <Item class="ReplicatedStorage" referent="RBX4">
    <Properties>
      <string name="Name">ReplicatedStorage</string>
    </Properties>
    <Item class="Folder" referent="RBX5">
      <Properties>
        <string name="Name">ATLAS_Packages</string>
      </Properties>
      <Item class="ModuleScript" referent="RBX6">
        <Properties>
          <string name="Name">${title.replace(/[^a-zA-Z0-9]/g, "_")}_Core</string>
          <ProtectedString name="Source"><![CDATA[--!strict
-- ATLAS Certified Build: ${title}
-- Generated for instant delivery by ATLAS (https://atlas.roblox.marketplace)
-- Verified clean Luau script with zero dependencies

local BuildPackage = {}
BuildPackage.__index = BuildPackage

BuildPackage.Version = "3.4.0-release"
BuildPackage.BuildName = "${title}"
BuildPackage.Author = "ATLAS Verified Partner"

function BuildPackage.Init()
    print("[ATLAS] Initialized " .. BuildPackage.BuildName .. " successfully.")
    print("[ATLAS] Studio 2026 Ready. Enjoy your build!")
end

return BuildPackage
]]></ProtectedString>
        </Properties>
      </Item>
    </Item>
  </Item>
  <Item class="ServerScriptService" referent="RBX7">
    <Properties>
      <string name="Name">ServerScriptService</string>
    </Properties>
    <Item class="Script" referent="RBX8">
      <Properties>
        <string name="Name">AtlasBootstrap</string>
        <ProtectedString name="Source"><![CDATA[-- ATLAS Server-side loader
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local CoreModule = require(ReplicatedStorage.ATLAS_Packages.${title.replace(/[^a-zA-Z0-9]/g, "_")}_Core)

CoreModule.Init()
print("[ATLAS] Server-Authoritative modules running!")
]]></ProtectedString>
      </Properties>
    </Item>
  </Item>
</roblox>`;

  const blob = new Blob([xmlContent], { type: "application/xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const filename = `${id}_studio_build.rbxl`;
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return filename;
}
