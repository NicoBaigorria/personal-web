'use client'

import ThreeScene from "@/components/scene3D/scene";
import styles from '@/styles/boatScene.module.scss';
import "@/styles/globals.scss";

export default function Page() {
    return (
        <div className={styles.pageBoatScene}>
            <ThreeScene/>
        </div>
    );
}