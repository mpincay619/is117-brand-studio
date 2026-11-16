"use strict";

(() => {
  const form = document.querySelector("#product-form");
  if (!form) return;

  const sizeError = document.querySelector("#size-error");
  const bagCount = document.querySelector("#bag-count");
  const bagStatus = document.querySelector("#bag-status");
  const bagItems = document.querySelector("#bag-items");
  const clearBag = document.querySelector("#clear-bag");
  const sizes = ["S", "M", "L", "XL"];
  const bag = [];

  const renderBag = () => {
    bagCount.textContent = String(bag.length);
    clearBag.disabled = bag.length === 0;
    bagItems.replaceChildren();
    sizes.forEach((size) => {
      const quantity = bag.filter((item) => item === size).length;
      if (!quantity) return;
      const item = document.createElement("li");
      item.textContent = `TENSILE Heavyweight Tee · Size ${size} · Quantity ${quantity}`;
      bagItems.append(item);
    });
  };

  // Load any previously persisted SQLite orders when running on local Node server
  fetch("/api/orders")
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      if (!data?.orders?.length) return;
      const latest = data.orders[0];
      bagStatus.textContent = `SQLite order history loaded (${data.orders.length} saved). Latest: #${latest.id} — Size ${latest.size} ($${latest.total_usd} USD).`;
    })
    .catch(() => {
      // Static GitHub Pages preview mode (no local SQLite server running)
    });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const selected = form.querySelector('input[name="size"]:checked');
    if (!selected || !sizes.includes(selected.value)) {
      sizeError.hidden = false;
      form.querySelectorAll('input[name="size"]').forEach((input) => {
        input.setAttribute("aria-invalid", "true");
      });
      form.querySelector('input[name="size"]').focus();
      return;
    }

    sizeError.hidden = true;
    bag.push(selected.value);
    renderBag();
    const itemWord = bag.length === 1 ? "item" : "items";

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: "Simulated Buyer (IS117 Demo)",
          size: selected.value,
          quantity: 1,
        }),
      });
      if (response.ok) {
        const { order } = await response.json();
        bagStatus.textContent = `Simulated checkout saved to SQLite (Order #${order.id} · Size ${order.size} · $${order.total_usd} USD). Bag has ${bag.length} ${itemWord}.`;
        return;
      }
    } catch {
      // Fallback for static GitHub Pages preview
    }

    bagStatus.textContent = `Added a TENSILE Heavyweight Tee in size ${selected.value} ($42 USD simulated checkout). Your demo bag has ${bag.length} ${itemWord}.`;
  });

  form.addEventListener("change", () => {
    sizeError.hidden = true;
    form.querySelectorAll('input[name="size"]').forEach((input) => {
      input.removeAttribute("aria-invalid");
    });
  });

  clearBag.addEventListener("click", () => {
    bag.length = 0;
    renderBag();
    bagStatus.textContent =
      "Your demo bag is empty. Choose a size to try it again.";
    form.querySelector('input[name="size"]:checked')?.focus();
  });
})();
