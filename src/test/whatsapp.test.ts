import { describe, expect, it } from "vitest";
import { waLink } from "@/lib/site";

describe("WhatsApp booking link", () => {
  it("opens the clinic number 38345207056", () => {
    expect(waLink("sq").startsWith("https://wa.me/38345207056?text=")).toBe(true);
  });
  it("includes the service name when coming from a service card", () => {
    expect(decodeURIComponent(waLink("sq", "Fizioterapi"))).toContain("Përshëndetje, dua të rezervoj një termin për Fizioterapi.");
  });
});
