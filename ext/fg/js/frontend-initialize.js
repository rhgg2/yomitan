/*
 * Copyright (C) 2019  Alex Yatskov <alex@foosoft.net>
 * Author: Alex Yatskov <alex@foosoft.net>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


async function main() {
    const data = window.frontendInitializationData || {};
    const {id, depth=0, parentFrameId, ignoreNodes, url, proxy=false} = data;

    let popupHost = null;
    if (!proxy) {
        popupHost = new PopupProxyHost();
        await popupHost.prepare();
    }

    const popup = proxy ? new PopupProxy(depth + 1, id, parentFrameId, url) : popupHost.createPopup(null, depth);
    const frontend = new Frontend(popup, ignoreNodes);
    await frontend.prepare();
}

main();
