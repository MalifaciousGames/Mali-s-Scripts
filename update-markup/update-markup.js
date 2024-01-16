/* Mali's update wrapper markup */

((isCooldown = false) => {
    const shadowHandler = Wikifier.helpers.shadowHandler || Wikifier.helpers.createShadowSetterCallback,
        updateWrappers = () => $('[role="update-wrapper"]').each((_, el) => el.update());

    Wikifier.Parser.add({
        name: 'updateMarkup',
        match: '{{(?:.*?}})',
        handler(w) {
            const raw = w.matchText.slice(2, -2).trim(),
                $wrp = $(`<span role='update-wrapper'>`).text(stringFrom(State.getVar(raw))).get(0),
                getShadow = shadowHandler(`State.getVar("${raw.replace(/"|'|`/g, m => `\\${m}`)}")`);

            $wrp.update = function () {
                this.innerText = stringFrom(getShadow());
            };
            w.output.append($wrp);
        }
    });

    $(document).on('change click drop refreshUpdateContainers', () => {
        if (isCooldown) return;

        updateWrappers();
        isCooldown = true;
        setTimeout(() => isCooldown = false, 100);
    });

    // Exports.
    setup.updateWrappers = updateWrappers;
})();
